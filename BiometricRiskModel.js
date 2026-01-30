import * as tf from '@tensorflow/tfjs';

/**
 * Performs K-Means Clustering to detect anomalies.
 * Input: Age, Biometric Integrity Score
 * Output: Cluster ID (0=Normal, 1=Warning, 2=Anomaly)
 */
export const trainAndPredict = async (data) => {
      // 1. Prepare Data
      // We map each record to a 2D point: [Normalized Age, Normalized Integrity Score]

      // Integrity Mapping
      // 'Success' -> 1.0
      // 'Fingerprint' -> 0.4 (Low integrity)
      // 'Iris' -> 0.6
      // 'Face' -> 0.8

      const points = [];
      data.forEach(item => {
            const age = parseInt(item.Age) || 60;
            let integrity = 1.0;

            const status = (item.status || '').toLowerCase();
            const reason = (item.FailureReason || '').toLowerCase();

            if (status.includes('fail')) {
                  if (reason.includes('finger') || reason.includes('skin')) integrity = 0.3;
                  else if (reason.includes('iris') || reason.includes('eye')) integrity = 0.5;
                  else if (reason.includes('face')) integrity = 0.7;
                  else integrity = 0.4;
            }

            // Normalize: Age (0-100) -> 0-1, Integrity (0-1) -> 0-1
            // We invert Age for clustering so "Young + High Integrity" are close
            points.push([
                  (age - 50) / 50, // Normalized Age (approx)
                  integrity        // Integrity Score
            ]);
      });

      if (points.length === 0) return [];

      const tensorPoints = tf.tensor2d(points);

      // 2. K-Means Clustering (Simplified Implementation using TF.js)
      // We want 3 clusters:
      // 1. High Integrity (Safe)
      // 2. Medium Integrity (Warning)
      // 3. Low Integrity (Anomaly)

      const k = 3;
      let centroids = tf.randomUniform([k, 2]); // Random start

      // Iterate to find centroids (10 iterations is plenty for this demo size)
      for (let i = 0; i < 15; i++) {
            const expandedPoints = tensorPoints.expandDims(1); // [N, 1, 2]
            const expandedCentroids = centroids.expandDims(0); // [1, K, 2]

            // Calculate Euclidean distance
            const distances = expandedPoints.sub(expandedCentroids).square().sum(2).sqrt(); // [N, K]

            // Assign to nearest centroid
            const assignments = distances.argMin(1); // [N]

            // Update centroids
            const newCentroidsArr = [];
            for (let c = 0; c < k; c++) {
                  // Mask for points in this cluster
                  const mask = assignments.equal(tf.scalar(c, 'int32')).expandDims(1);

                  // If cluster is empty, keep old centroid (simplification)
                  const count = mask.sum().dataSync()[0];
                  if (count === 0) {
                        newCentroidsArr.push(centroids.slice([c, 0], [1, 2]));
                  } else {
                        // Mean of points in cluster
                        const sum = tensorPoints.mul(mask.cast('float32')).sum(0);
                        newCentroidsArr.push(sum.div(tf.scalar(count)));
                  }
            }
            centroids = tf.concat(newCentroidsArr);
      }

      // 3. Final Assignments
      const finalDistances = tensorPoints.expandDims(1).sub(centroids.expandDims(0)).square().sum(2).sqrt();
      const clusterIds = finalDistances.argMin(1).dataSync(); // Int32Array

      // 4. Format Output
      // Determine which cluster is "Anomaly" (Lowest average Y / Integrity)
      const centroidValues = centroids.arraySync(); // [[x,y], [x,y], [x,y]]

      // Sort clusters by "Integrity" (Y axis, index 1)
      // 0 = Worst (Anomaly), 2 = Best (Safe)
      const clusterHealth = centroidValues.map((c, i) => ({ id: i, health: c[1] }));
      clusterHealth.sort((a, b) => a.health - b.health);

      const anomalyClusterId = clusterHealth[0].id;
      const warningClusterId = clusterHealth[1].id;
      // safeClusterId = clusterHealth[2].id

      const results = data.map((item, index) => {
            const cid = clusterIds[index];
            let status = 'Safe';
            if (cid === anomalyClusterId) status = 'Anomaly';
            else if (cid === warningClusterId) status = 'Warning';

            // Calculate a simulated "Score" for the graph Y-axis
            // Add random jitter for visualization so they don't overlap perfectly
            const integrity = points[index][1];
            const age = parseInt(item.Age) || 60;

            return {
                  x: age,
                  y: (integrity * 100) + (Math.random() * 5 - 2.5), // Score 0-100 with jitter
                  cluster: status,
                  name: item.name
            };
      });

      // Cleanup
      tensorPoints.dispose();
      centroids.dispose();

      return results;
};
