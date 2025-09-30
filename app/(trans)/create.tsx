import { createCreateStyles } from "@/assets/styles/create.styles";
import { FormField } from "@/components/FormField";
import KeyboardLayout from "@/components/KeyboardLayout";
import LoadingSpinner from "@/components/LoadingSpinner";
import SuccessAlert from "@/components/SuccessAlert";
import { CATEGORIES } from "@/constants/trans";
import { useAuth } from "@/hooks/useAuth";
import { useCreateTransaction } from "@/hooks/useTransaction";
import { getSelectedCurrencyAtom } from "@/stores/settingsStore";
import { getThemeColorsAtom } from "@/stores/themeStore";
import { CreateTransForm, TransType } from "@/types/trans";
import { createTransSchema } from "@/validations/trans.validation";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { useAtomValue } from "jotai";
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";

export default function Create() {
  const COLORS = useAtomValue(getThemeColorsAtom);
  const styles = createCreateStyles(COLORS);
  const { symbol = "$" } = useAtomValue(getSelectedCurrencyAtom) || {};

  const { user } = useAuth();
  const { isPending: isLoading, mutate, status } = useCreateTransaction();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(createTransSchema),
    mode: "onChange",
    defaultValues: {
      amount: "",
      title: "",
      category: undefined,
      type: "expense",
      userId: user?.id,
    },
  });
  const watchedAmount = watch("amount");
  const watchedType = watch("type");
  const isExpense = watchedType === "expense";

  function createHandler(data: CreateTransForm) {
    mutate(data);
    reset();
  }

  function typeSelectHandler(type: TransType) {
    setValue("type", type, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }

  const message =
    status === "success" ? "Item has been added successfly" : undefined;

  console.log(message);

  return (
    <KeyboardLayout>
      <View>
        {/* header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Transaction</Text>
          <TouchableOpacity
            style={[
              styles.saveButtonContainer,
              (!isValid || isLoading) && styles.saveButtonDisabled,
            ]}
            onPress={handleSubmit(createHandler)}
            disabled={!isValid || isLoading}
          >
            <Text style={styles.saveButton}>
              {isLoading ? <LoadingSpinner size="small" /> : "Save"}
            </Text>
            {!isLoading && (
              <Ionicons name="checkmark" size={18} color={COLORS.primary} />
            )}
          </TouchableOpacity>
        </View>

        {/* main */}
        <View style={styles.main}>
          {message && <SuccessAlert message={message} autoDismisIn={3} />}

          {/* types */}
          <View style={styles.typeSelector}>
            <TouchableOpacity
              style={[styles.typeButton, isExpense && styles.typeButtonActive]}
              onPress={() => typeSelectHandler("expense")}
            >
              <Ionicons
                name="arrow-down-circle"
                size={22}
                color={isExpense ? COLORS.white : COLORS.expense}
                style={styles.typeIcon}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  isExpense && styles.typeButtonTextActive,
                ]}
              >
                Expense
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.typeButton, !isExpense && styles.typeButtonActive]}
              onPress={() => typeSelectHandler("income")}
            >
              <Ionicons
                name="arrow-up-circle"
                size={22}
                color={!isExpense ? COLORS.white : COLORS.income}
                style={styles.typeIcon}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  !isExpense && styles.typeButtonTextActive,
                ]}
              >
                Income
              </Text>
            </TouchableOpacity>
          </View>
          {/* amount */}
          <View
            style={[
              styles.amountContainer,
              errors.amount && { borderBottomColor: COLORS.expense },
            ]}
          >
            <Text style={styles.currencySymbol}>{symbol}</Text>
            <View style={{ flex: 1 }}>
              <FormField
                control={control}
                name="amount"
                placeholder="0.00"
                keyboardType="numeric"
                inputStyle={styles.amountInput}
                saveErrorSpace={false}
                error={errors.amount}
              />
            </View>
            {errors.amount && (
              <Text
                style={[
                  styles.inputError,
                  !!watchedAmount.length && {
                    alignSelf: "flex-end",
                    zIndex: 0,
                    position: "absolute",
                  },
                ]}
              >
                {errors.amount.message}
              </Text>
            )}
          </View>
          {/* title input */}
          <View
            style={[
              styles.titleContainer,
              errors.title && { borderColor: COLORS.expense },
            ]}
          >
            <Ionicons
              name="create-outline"
              size={22}
              color={COLORS.textLight}
              style={styles.inputIcon}
            />
            <View style={{ flex: 1 }}>
              <FormField
                control={control}
                name="title"
                placeholder="Transaction title"
                inputStyle={styles.titleInput}
                saveErrorSpace={false}
              />
            </View>
            {errors.title && (
              <Text style={styles.inputError}>{errors.title.message}</Text>
            )}
          </View>
          {/* catg */}
          <View>
            <Text style={styles.sectionTitle}>
              <Ionicons name="pricetag-outline" size={16} color={COLORS.text} />{" "}
              Category
            </Text>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <View style={styles.categoryGrid}>
                  {CATEGORIES.map((category) => {
                    const isActive = field.value === category.id;
                    return (
                      <TouchableOpacity
                        key={category.id}
                        style={[
                          styles.categoryButton,
                          isActive && styles.categoryButtonActive,
                        ]}
                        onPress={() => field.onChange(category.id)}
                      >
                        <Ionicons
                          name={category.icon}
                          size={20}
                          color={isActive ? COLORS.white : COLORS.text}
                          style={styles.categoryIcon}
                        />
                        <Text
                          style={[
                            styles.categoryButtonText,
                            isActive && styles.categoryButtonTextActive,
                          ]}
                        >
                          {category.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            />
          </View>
        </View>
      </View>
    </KeyboardLayout>
  );
}
