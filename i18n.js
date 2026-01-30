import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Strategic Intelligence Dashboard": "Strategic Intelligence Dashboard",
      "Administrative Biometric Exclusion Audit & Demographic Mapping": "Administrative Biometric Exclusion Audit & Demographic Mapping",
      "Initialize Regional Audit": "Initialize Regional Audit",
      "Upload departmental CSV logs containing State, District, Pincode, and Biometric Maturity data. Multiple files supported.": "Upload departmental CSV logs containing State, District, Pincode, and Biometric Maturity data. Multiple files supported.",
      "Select Source Files": "Select Source Files",
      "X-Axis Hierarchy": "X-Axis Hierarchy",
      "Y-Axis Metric": "Y-Axis Metric",
      "View Projection": "View Projection",
      "Geographical Risk Hotspots": "Geographical Risk Hotspots",
      "Volume Comparative": "Volume Comparative",
      "Bio-Maturity Acceleration": "Bio-Maturity Acceleration",
      "Add More Datasets": "Add More Datasets",
      "Clear Analysis": "Clear Analysis",
      "Show Duplicates": "Show Duplicates",
      "Hide Duplicates": "Hide Duplicates",
      "Duplicate Data Analysis": "Duplicate Data Analysis",
      "Identifying fraudulent entries and data integrity issues": "Identifying fraudulent entries and data integrity issues",
      "Duplicate Summary": "Duplicate Summary",
      "Total Duplicates Found:": "Total Duplicates Found:",
      "Unique Duplicate Groups:": "Unique Duplicate Groups:",
      "Clean Records:": "Clean Records:",
      "Detection Method": "Detection Method",
      "Duplicate Groups Identified": "Duplicate Groups Identified"
    }
  },
  hi: {
    translation: {
      "Strategic Intelligence Dashboard": "रणनीतिक खुफिया डैशबोर्ड",
      "Administrative Biometric Exclusion Audit & Demographic Mapping": "प्रशासनिक बायोमेट्रिक बहिष्करण ऑडिट और जनसांख्यिकीय मानचित्रण",
      "Initialize Regional Audit": "क्षेत्रीय ऑडिट शुरू करें",
      "Upload departmental CSV logs containing State, District, Pincode, and Biometric Maturity data. Multiple files supported.": "राज्य, जिला, पिनकोड और बायोमेट्रिक परिपक्वता डेटा युक्त विभागीय CSV लॉग अपलोड करें। एकाधिक फाइलें समर्थित।",
      "Select Source Files": "स्रोत फाइलें चुनें",
      "X-Axis Hierarchy": "X-अक्ष पदानुक्रम",
      "Y-Axis Metric": "Y-अक्ष मीट्रिक",
      "View Projection": "दृश्य प्रक्षेपण",
      "Geographical Risk Hotspots": "भौगोलिक जोखिम हॉटस्पॉट",
      "Volume Comparative": "वॉल्यूम तुलनात्मक",
      "Bio-Maturity Acceleration": "बायो-परिपक्वता त्वरण",
      "Add More Datasets": "अधिक डेटासेट जोड़ें",
      "Clear Analysis": "विश्लेषण साफ करें",
      "Show Duplicates": "डुप्लिकेट दिखाएं",
      "Hide Duplicates": "डुप्लिकेट छुपाएं",
      "Duplicate Data Analysis": "डुप्लिकेट डेटा विश्लेषण",
      "Identifying fraudulent entries and data integrity issues": "धोखाधड़ी प्रविष्टियों और डेटा अखंडता मुद्दों की पहचान",
      "Duplicate Summary": "डुप्लिकेट सारांश",
      "Total Duplicates Found:": "कुल डुप्लिकेट मिले:",
      "Unique Duplicate Groups:": "अद्वितीय डुप्लिकेट समूह:",
      "Clean Records:": "साफ रिकॉर्ड:",
      "Detection Method": "पता लगाने की विधि",
      "Duplicate Groups Identified": "डुप्लिकेट समूह पहचाने गए"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;