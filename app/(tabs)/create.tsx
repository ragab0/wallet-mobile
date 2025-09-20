import { styles } from "@/assets/styles/create.styles";
import { FormField } from "@/components/FormField";
import KeyboardLayout from "@/components/KeyboardLayout";
import { COLORS } from "@/constants/theme";
import { CATEGORIES } from "@/constants/trans";
import { Category, CreateTransForm } from "@/types/trans";
import { createTransSchema } from "@/validations/trans.validation";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";

const useCreateTransaction = () => {
  return {
    mutate: (data: any) => {
      console.log("Creating transaction:", data);
    },
    isLoading: false,
  };
};

export default function Create() {
  const [isExpense, setIsExpense] = useState(true);
  const createTransactionMutation = useCreateTransaction();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(createTransSchema),
    mode: "onChange",
    defaultValues: {
      amount: "",
      title: "",
      category: undefined,
      type: "expense",
    },
  });
  const watchedAmount = watch("amount");
  const watchedTitle = watch("title");
  const watchedCategory = watch("category");

  function createHandler(data: CreateTransForm) {
    const transactionData = {
      ...data,
      type: isExpense ? "expense" : "income",
    };
    createTransactionMutation.mutate(transactionData);
  }

  const handleCategorySelect = (category: Category) => {
    console.log(category);
    setValue("category", category, { shouldValidate: true });
  };

  const isFormValid =
    isValid && watchedCategory && watchedAmount && watchedTitle;

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
              (!isFormValid || createTransactionMutation.isLoading) &&
                styles.saveButtonDisabled,
            ]}
            onPress={handleSubmit(createHandler)}
            disabled={!isFormValid || createTransactionMutation.isLoading}
          >
            <Text style={styles.saveButton}>
              {createTransactionMutation.isLoading ? "Saving..." : "Save"}
            </Text>
            {!createTransactionMutation.isLoading && (
              <Ionicons name="checkmark" size={18} color={COLORS.primary} />
            )}
          </TouchableOpacity>
        </View>

        {/* main */}
        <View style={styles.main}>
          {/* types */}
          <View style={styles.typeSelector}>
            <TouchableOpacity
              style={[styles.typeButton, isExpense && styles.typeButtonActive]}
              onPress={() => setIsExpense(true)}
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
              onPress={() => setIsExpense(false)}
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
            <Text style={styles.currencySymbol}>$</Text>
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
              <Text style={styles.inputError}>{errors.amount.message}</Text>
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
            <View style={styles.categoryGrid}>
              {CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    watchedCategory?.id === category.id &&
                      styles.categoryButtonActive,
                  ]}
                  onPress={() => handleCategorySelect(category)}
                >
                  <Ionicons
                    name={category.icon}
                    size={20}
                    color={
                      watchedCategory?.id === category.id
                        ? COLORS.white
                        : COLORS.text
                    }
                    style={styles.categoryIcon}
                  />
                  <Text
                    style={[
                      styles.categoryButtonText,
                      watchedCategory?.id === category.id &&
                        styles.categoryButtonTextActive,
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
    </KeyboardLayout>
  );
}
