import { login, register } from "@/apiHelper/auth";
import { ButtonText, Button } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useAuth } from "@/src/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { Redirect, Stack } from "expo-router";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import React, { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setUser = useAuth((s) => s.setUser);
  const setToken = useAuth((s) => s.setToken);
  const isLoggedIn = useAuth((s) => !!s.token);

  const loginMutation = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (data) => {
      if (data.user && data.token) {
        setUser(data.user);
        setToken(data.token);
      }
    },
    onError: (e) => {
      console.log("error", e);
    },
  });

  const signUpMutation = useMutation({
    mutationFn: () => register(email, password, ""),
    onSuccess: (data) => {
      console.log("Success", data);
    },
    onError: (e) => {
      console.log("error", e);
    },
  });

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };
  if (isLoggedIn) {
    return <Redirect href={"/"} />;
  }
  return (
    <FormControl
      //   isInvalid={loginMutation.error || signUpMutation.error}
      className="p-4 border rounded-lg border-outline-300 bg-white flex-1 max-w-[500px]"
    >
      <Stack.Screen
        options={{
          title: "Login",
          headerLeft: undefined,
          headerRight: undefined,
        }}
      />
      <VStack space="xl">
        <VStack space="xs">
          <Text className="text-typography-500 leading-1">Email</Text>
          <Input>
            <InputField type="text" value={email} onChangeText={setEmail} />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text className="text-typography-500 leading-1">Password</Text>
          <Input className="text-center">
            <InputField
              type={showPassword ? "text" : "password"}
              value={password}
              onChangeText={setPassword}
            />
            <InputSlot className="pr-3" onPress={handleState}>
              {/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
              <InputIcon
                as={showPassword ? EyeIcon : EyeOffIcon}
                className="text-darkBlue-500"
              />
            </InputSlot>
          </Input>
        </VStack>
        <HStack className="gap-4">
          <Button
            className="flex-1"
            onPress={() => {
              signUpMutation.mutate();
            }}
          >
            <ButtonText className="text-typography-0">Sign Up</ButtonText>
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onPress={() => loginMutation.mutate()}
          >
            <ButtonText className="text-typography-600 ">Sign In</ButtonText>
          </Button>
        </HStack>
      </VStack>
    </FormControl>
  );
}
