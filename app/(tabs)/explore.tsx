import { Button } from 'react-native';

export default function TabTwoScreen() {
  console.log("aaaa");
  
  return (
    <div>
      <Button title="Create Profile" onPress={() => { console.log("Button Pressed!") }} />
    </div>
  );
}
