import { Revenue2 } from "@/assets/images";
import { styles } from "@/assets/styles/auth.styles";
import { ErrorAlert } from "@/components/ErrorAlert";
import { FormField } from "@/components/FormField";
import LoadingSpinner from "@/components/LoadingSpinner";
import GoogleLoginButton from "@/components/OAuthGoogleBtn";
import { COLORS } from "@/constants/theme";
import {
  useButtonPress,
  useFadeIn,
  useSlideInFromY,
  useSlideUpFadeIn,
} from "@/hooks/useAnimation";
import { useSignup } from "@/hooks/useAuth";
import { SignupRequest } from "@/types/auth";
import { signupSchema } from "@/validations/auth.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "expo-router";
import { useForm } from "react-hook-form";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Signup() {
  const imageAnim = useSlideUpFadeIn(600, 0);
  const titleAnim = useSlideInFromY(500, 600, false);
  const formAnim = useSlideInFromY(500, 800, true);
  const buttonAnim = useFadeIn(500, 1200);
  const googleButtonAnim = useFadeIn(500, 1500);
  const footerAnim = useSlideUpFadeIn(600, 2000, 50);
  const buttonPress = useButtonPress();

  const { isPending: isLoading, mutate, error: apiError } = useSignup();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupRequest>({
    resolver: yupResolver(signupSchema),
    mode: "onChange",
  });

  async function onSubmit(data: SignupRequest) {
    mutate(data);
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={false}
    >
      <View style={styles.container}>
        <Animated.View
          style={{
            opacity: imageAnim.opacity,
            transform: [{ translateY: imageAnim.translateY }],
          }}
        >
          <Image source={Revenue2} style={styles.img} />
        </Animated.View>
        <Animated.View style={{ opacity: titleAnim.opacity }}>
          <Text style={styles.title}>Create Account</Text>
        </Animated.View>

        {apiError && <ErrorAlert error={apiError} />}

        <Animated.View
          style={[
            styles.formContainer,
            {
              opacity: formAnim.opacity,
            },
          ]}
        >
          <FormField
            control={control}
            name="fname"
            placeholder="First Name"
            autoCapitalize="words"
            error={errors.fname}
            editable={!isLoading}
          />
          <FormField
            control={control}
            name="lname"
            placeholder="Last Name"
            autoCapitalize="words"
            error={errors.lname}
            editable={!isLoading}
          />
          <FormField
            control={control}
            name="email"
            placeholder="Email Address"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            editable={!isLoading}
          />
          <FormField
            control={control}
            name="password"
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            error={errors.password}
            editable={!isLoading}
          />
          <FormField
            control={control}
            name="passwordConfirm"
            placeholder="Confirm Password"
            secureTextEntry={true}
            autoCapitalize="none"
            error={errors.passwordConfirm}
            editable={!isLoading}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: buttonAnim,
            },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.button,
              (isLoading || !isValid) && styles.buttonDisabled,
            ]}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading || !isValid}
            onPressIn={buttonPress.onPressIn}
            onPressOut={buttonPress.onPressOut}
          >
            {isLoading && <LoadingSpinner size="small" color={COLORS.white} />}
            <Text style={styles.buttonText}>
              {isLoading ? "Creating Account" : "Create Account"}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[styles.buttonContainer, { opacity: googleButtonAnim }]}
        >
          <GoogleLoginButton
            onError={() => {
              console.log("onError");
            }}
            disabled={isLoading}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.footerContainer,
            {
              opacity: footerAnim.opacity,
              transform: [{ translateY: footerAnim.translateY }],
            },
          ]}
        >
          <Text style={styles.footerText}>Already have an account?</Text>
          <Link href="/login" asChild>
            <TouchableOpacity disabled={isLoading}>
              <Text style={styles.linkText}>Sign in</Text>
            </TouchableOpacity>
          </Link>
        </Animated.View>
      </View>
    </KeyboardAwareScrollView>
  );
}
