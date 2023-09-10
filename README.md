# Instructions to start the application

- The `/root/backend` folder must have .env file
  - The env file contains following fields:
    - MONGODB_CONNECTION_URI -> for locally hosted applicaiton it is `mongodb://localhost:27017/uEarn`
    - PORT -> for locally hosted application it must be 5000
    - JWT_SECRET -> a random string ex: "ul498ru4repr0f94"
    - REFERRER_REWARD_UNIT -> amount of uEarn coins the referrer to be awarded ex: 100
    - ACCOUNT_ACTIVATION_FEE -> amount required for the new user to pay
    - BT_MERCHANT_ID -> this is provided by braintree
    - BT_PUBLIC_KEY -> this is provided by braintree
    - BT_PRIVATE_KEY -> this is provided by braintree
- The sytem must have `nodejs`, `npm`, and `mongod` installed
- Start mongodb daemon server (on linux) `sudo service mongod start`

### To start the application in development mode

- start with 2 terminals
- in 1st terminal navigate to folder `/root/frontend`
  - run command `npm run dev`
- in 2nd terminal navigate to folder `/root/backend`
  - run command `npm run start`
- Visit `http://127.0.0.1:5173`

### To start the server application in production mode

- navigate to folder `/root/backend`
- run command `npm run start`
- For locally hosted application visit `http://127.0.0.1:5000`

### If some changes are made to frontend and needs to be implemented at the backend in production mode

- navigate to folder `/root/frontend`
- run command `npm run server-build`
- restart the server

# uEarn

uEarn is an innovative online platform that leverages the power of referrals to create a dynamic earning opportunity for users.

# Project Description: uEarn - Referral Website with Refer and Earn System

### Overview:

- uEarn is an innovative online platform that leverages the power of referrals to create a dynamic earning opportunity for users.
- The platform enables users to refer their friends, family, and acquaintances, inviting them to register on the website with a certain initial investment (X amount).
- Upon successful registration, both the referrer and the referred user are rewarded – the referrer receives a reward (Y amount) for each successful referral, while the referred user gains access to the platform's unique features and benefits.

## Key Features:

- **User Registration and Account Creation:**

  - New users will sign up and create accounts by providing essential details.
  - A nominal registration fee (X amount) will be required for new users to become active participants.
  - User profiles will store referral histories, earnings, and other relevant information.

- Referral System:

  - Users will receive a personalized referral link upon registration.
  - Users can share this link with their contacts through social media, emails, and other communication channels.
  - When someone clicks on the referral link and registers with the platform, the referrer will be credited for the successful referral.

- Reward Calculation:

  - For each successful referral, the referrer will earn a predetermined reward (Y amount) that will be added to their uEarn account.
  - The reward structure will be transparent and clearly communicated to users.

- Dashboard and Analytics:

  - Users will have access to a personalized dashboard displaying their referral history, earnings, and performance metrics.
  - Analytics tools will provide users with insights into the effectiveness of their referral strategies.

- Secure Payment Gateway:
  - The platform will integrate a secure payment gateway for user registrations and reward distributions.
  - Users will have multiple payment options for registering and receiving rewards.

## Development Process:

- **Logo Design and Branding:**

  - Collaborate with the design team to create a modern and appealing logo that resonates with the platform's concept.
  - Choose a color scheme and branding elements that reflect trustworthiness and user-friendliness.

- **Website Layout and User Interface:**

  - Design a user-friendly and intuitive website layout that focuses on easy navigation and clear calls to action.
  - Create responsive design elements to ensure seamless user experiences across various devices.

- **Frontend Development:**

  - Develop the frontend using modern web technologies (HTML5, CSS3, JavaScript) to create an engaging and interactive user interface.
  - Implement the referral link generation, registration process, and dashboard components.

- **Backend Development:**

  - Build a robust backend system that handles user registrations, referral tracking, reward calculations, and user account management.
  - Ensure data security and privacy measures are in place to safeguard user information.

- **Integration and Testing:**

  - Integrate the payment gateway to facilitate secure transactions for registration fees and reward disbursements.
  - Conduct rigorous testing of all features to identify and rectify any bugs or glitches.

- **Launch and Marketing:** (to be done by deployment and development team)
  - Deploy the website on a reliable hosting platform, ensuring optimal performance and uptime.
  - Develop a marketing strategy to promote the platform, attract users, and encourage referrals.

### Conclusion:

uEarn is set to revolutionize the way users earn through referrals, offering a user-friendly platform with seamless registration, referral tracking, and reward distribution systems. With its appealing design, secure payment gateway, and comprehensive analytics, uEarn promises an exciting and lucrative experience for users seeking additional income opportunities through referrals.
