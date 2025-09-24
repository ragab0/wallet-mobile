import { globals } from "@/assets/styles/globals.styles";
import { styles } from "@/assets/styles/profile.styles";
import { ErrorAlert } from "@/components/ErrorAlert";
import { FormField } from "@/components/FormField";
import KeyboardLayout from "@/components/KeyboardLayout";
import LoadingSpinner from "@/components/LoadingSpinner";
import { SuccessAlert } from "@/components/SuccessAlert";
import { COLORS } from "@/constants/theme";
import {
  useCurrentUser,
  useUpdateProfile,
  useUploadPicture,
} from "@/hooks/useUser";
import { AppError } from "@/types/error";
import { UpdateUserData } from "@/types/user";
import { profileSchema } from "@/validations/account.validation";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EditProfileScreen() {
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const updateProfileMutation = useUpdateProfile();
  const uploadPictureMutation = useUploadPicture();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<AppError | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<UpdateUserData>({
    resolver: yupResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      fname: "",
      lname: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        fname: user.fname,
        lname: user.lname,
      });
    }
  }, [user, reset]);

  async function onSubmit(data: UpdateUserData) {
    await updateProfileMutation.mutateAsync(data);
    try {
      setError(null);
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      setError(error as AppError);
    }
  }

  function handleImagePicker() {
    Alert.alert("Change Profile Picture", "Choose an option", [
      { text: "Camera", onPress: () => pickImage("camera") },
      { text: "Gallery", onPress: () => pickImage("gallery") },
      { text: "Cancel", style: "cancel" },
    ]);
  }
  async function pickImage(source: "camera" | "gallery") {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "We need camera roll permissions to change your profile picture."
        );
        return;
      }

      const result =
        source === "camera"
          ? await ImagePicker.launchCameraAsync({
              mediaTypes: ["images"],
              allowsEditing: false,
              // presentationStyle: "fullScreen",
              selectionLimit: 1,
              aspect: [1, 1],
              quality: 0.8,
            })
          : await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ["images"],
              allowsEditing: false,
              // presentationStyle: "fullScreen",
              selectionLimit: 1,
              aspect: [1, 1],
              quality: 0.8,
            });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        const formData = new FormData();

        formData.append("picture", {
          uri: asset.uri,
          type: "image/jpeg",
          name: "picture.jpg",
        } as any);

        setError(null);
        await uploadPictureMutation.mutateAsync(formData);
        setSuccessMessage("Profile picture updated successfully!");
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (error: any) {
      if (error?.code === "ERR_USER_REJECTED_PERMISSIONS") {
        setError({
          message: "Permission needed",
          type: "CLIENT_ERROR",
          details: "",
        });
      }
    }
  }

  if (userLoading) {
    return <LoadingSpinner isFull={true} />;
  }

  const isLoading =
    updateProfileMutation.isPending || uploadPictureMutation.isPending;

  return (
    <KeyboardLayout>
      <ScrollView
        style={globals.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Alert */}
        {successMessage && (
          <SuccessAlert
            message={successMessage}
            onDismiss={() => setSuccessMessage(null)}
          />
        )}

        {/* Error Alert */}
        {error && (
          <ErrorAlert
            error={error}
            onRetry={() => setError(null)}
            onDismiss={() => setError(null)}
            showRetry={false}
          />
        )}

        {/* Profile Picture Section */}
        <View style={styles.pictureSection}>
          <TouchableOpacity
            style={styles.pictureContainer}
            onPress={handleImagePicker}
            disabled={isLoading}
          >
            {user?.picture ? (
              <Image
                source={{ uri: user.picture }}
                style={styles.largePicture}
              />
            ) : (
              <View style={styles.largeDefaultPicture}>
                <Ionicons name="person" size={60} color={COLORS.primary} />
              </View>
            )}
            <View style={styles.pictureEditButton}>
              <Ionicons name="camera" size={16} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
          <Text style={styles.pictureHint}>
            Tap the camera icon to change your profile picture
          </Text>
        </View>

        {/* Form Section */}
        <View style={[globals.card]}>
          <Text style={globals.sectionTitle}>Personal Information</Text>
          <View style={globals.groups}>
            <View>
              <Text style={globals.inputLabel}>First Name</Text>
              <FormField
                control={control}
                name="fname"
                placeholder="Enter your first name"
                error={errors.fname}
                autoCapitalize="words"
              />
            </View>
            <View>
              <Text style={globals.inputLabel}>Last Name</Text>
              <FormField
                control={control}
                name="lname"
                placeholder="Enter your last name"
                error={errors.lname}
                autoCapitalize="words"
              />
            </View>
            <View>
              <Text style={globals.inputLabel}>Email</Text>
              <TextInput value={user?.email} editable={false} />
              <Text></Text>
            </View>
            <View>
              <Text style={globals.inputLabel}>Role</Text>
              <TextInput value={user?.role} editable={false} />
              <Text></Text>
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={[
              styles.saveButton,
              (!isDirty || isLoading) && globals.disabledButton,
            ]}
            onPress={handleSubmit(onSubmit)}
            disabled={!isDirty || isLoading}
          >
            {isLoading ? (
              <LoadingSpinner size="small" color={COLORS.white} />
            ) : (
              <>
                <Ionicons name="save-outline" size={20} color={COLORS.white} />
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </>
            )}
          </TouchableOpacity>

          <Text style={styles.saveHint}>
            {isDirty ? "You have unsaved changes" : "No changes to save"}
          </Text>
        </View>

        {/* Account Status */}
        <View style={globals.card}>
          <Text style={globals.sectionTitle}>Account Status</Text>
          <View style={styles.statusGrid}>
            <View style={styles.statusCard}>
              <Ionicons
                name={user?.isActive ? "checkmark-circle" : "close-circle"}
                size={24}
                color={user?.isActive ? "#10B981" : "#EF4444"}
              />
              <Text style={styles.statusCardTitle}>Account Status</Text>
              <Text style={styles.statusCardValue}>
                {user?.isActive ? "Active" : "Inactive"}
              </Text>
            </View>
            <View style={styles.statusCard}>
              <Ionicons
                name={user?.isEmailVerified ? "mail" : "mail-outline"}
                size={24}
                color={user?.isEmailVerified ? "#10B981" : "#F59E0B"}
              />
              <Text style={styles.statusCardTitle}>Email Status</Text>
              <Text style={styles.statusCardValue}>
                {user?.isEmailVerified ? "Verified" : "Unverified"}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardLayout>
  );
}
