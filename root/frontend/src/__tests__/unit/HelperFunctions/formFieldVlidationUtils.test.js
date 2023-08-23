import {
  validateUsername,
  validatePassword,
  validateFirstName,
  validateLastName,
} from "../../../HelperFunctions/formFieldValidationUtils";

describe("validateUsername", () => {
  it("returns an error message when username is empty", () => {
    expect(validateUsername("")).toBe("Username can't be empty");
  });

  it("returns an error message when username contains special characters", () => {
    expect(validateUsername("user@name")).toBe(
      "Username must not contain any special characters except _"
    );
  });

  it("returns an error message when username length is less than 6", () => {
    expect(validateUsername("user")).toBe(
      "Username must be between 6 and 20 characters long"
    );
  });

  it("returns an error message when username length is greater than 20", () => {
    expect(
      validateUsername("thisusernameisverylongandhasmorethan20characters")
    ).toBe("Username must be between 6 and 20 characters long");
  });

  it("returns null when username is valid", () => {
    expect(validateUsername("valid_user123")).toBeNull();
  });
});

describe("validatePassword", () => {
  it("returns an array of error messages when password is empty", () => {
    expect(validatePassword("")).toEqual([
      "Password can't be empty",
      "Password must be between 7 and 30 characters long",
      "Password must contain at least one special character",
    ]);
  });

  it("returns an array of error messages when password length is less than 7", () => {
    expect(validatePassword("pass")).toEqual([
      "Password must be between 7 and 30 characters long",
      "Password must contain at least one special character",
    ]);
  });

  it("returns an array of error messages when password length is greater than 30", () => {
    expect(
      validatePassword("thispasswordisverylongandhasmorethan30characters")
    ).toEqual([
      "Password must be between 7 and 30 characters long",
      "Password must contain at least one special character",
    ]);
  });

  it("returns an array of error messages when password contains no special characters", () => {
    expect(validatePassword("password123")).toEqual([
      "Password must contain at least one special character",
    ]);
  });

  it("returns null when password is valid", () => {
    expect(validatePassword("valid_pass!123")).toBeNull();
  });
});

describe("validateFirstName", () => {
  it("returns an error message when first name is empty", () => {
    expect(validateFirstName("")).toBe("Firstname can't be empty");
  });

  it("returns an error message when first name length is greater than 30", () => {
    expect(
      validateFirstName("thisfirstnameisverylongandhasmorethan30characters")
    ).toBe("Firstname must be less than 30 characters");
  });

  it("returns null when first name is valid", () => {
    expect(validateFirstName("John")).toBeNull();
  });
});

describe("validateLastName", () => {
  it("returns an error message when last name is empty", () => {
    expect(validateLastName("")).toBe("Lastname can't be empty");
  });

  it("returns an error message when last name length is greater than 30", () => {
    expect(
      validateLastName("thislastnameisverylongandhasmorethan30characters")
    ).toBe("Lastname must be less than 30 characters");
  });

  it("returns null when last name is valid", () => {
    expect(validateLastName("Doe")).toBeNull();
  });
});
