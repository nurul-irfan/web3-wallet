import { Stack } from 'expo-router';

export default function SettingsStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // 🚫 Disable the header
      }}
    />
  );
}
