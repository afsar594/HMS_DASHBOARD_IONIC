import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'hms_ionic',
  webDir: 'www',
   server: {
    allowNavigation: [
      'http://194.233.95.37:8096/InspireHms/api/*',
     ],
    cleartext: true,
  },
};

export default config;
 