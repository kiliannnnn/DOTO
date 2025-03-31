import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Profile {
  email: string;
  username: string;
}

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedProfile = await AsyncStorage.getItem('userProfile');
        if (savedProfile) {
          setProfile(JSON.parse(savedProfile));
        }
      } catch (error) {
        console.error('Error loading profile from AsyncStorage', error);
      }
    };

    loadProfile();
  }, []);

  const saveProfile = async () => {
    const newProfile = { email, username };
    try {
      if (Platform.OS === 'web') {
        localStorage.setItem('userProfile', JSON.stringify(newProfile));
      } else {
        await AsyncStorage.setItem('userProfile', JSON.stringify(newProfile));
      }
      console.log('Profile saved successfully:', newProfile);
      setProfile(newProfile);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem('userProfile');
      console.log('Storage cleared.');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.container}>
      {profile ? (
        <View style={styles.profileContainer}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Your Profile</Text>
          <Text style={styles.profileText}>Email: {profile.email}</Text>
          <Text style={styles.profileText}>Username: {profile.username}</Text>
          <Button title="Clear Storage" onPress={() => { clearStorage(); }} />
        </View>
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Please create a new profile to start organizing your day</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
          />

          <Button title="Create Profile" onPress={() => { saveProfile(); }} />
          <Button title="Clear Storage" onPress={() => { clearStorage(); }} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  formContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '400',
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  profileText: {
    fontSize: 18,
    marginTop: 10,
    color: '#444',
  },
});
