'use server';
/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
ABOUT THIS NODE.JS EXAMPLE: This example works with the AWS SDK for JavaScript version 3 (v3),
which is available at https://github.com/aws/aws-sdk-js-v3. This example is in the 'AWS SDK for JavaScript v3 Developer Guide' at
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/ses-examples.html.

Purpose:
sesClient.js is a helper function that creates an Amazon Simple Email Services (Amazon SES) service client.

*/
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

// Set the AWS Region.
const REGION = 'us-west-2';

// Create SES service object.
const sesClient = new SESClient({
  region: REGION,
  // access keys from IAM user w/ permissions
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

type Inputs = {
  email: string;
  firstName: string;
  lastName: string;
};

export const sendEmail = async (body: Inputs) => {
  const emailBodyHTML = `
<!DOCTYPE html>
<html>
<head>
    <style>
        .email-container {
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            padding: 20px;
        }
        .email-content {
            background-color: #ffffff;
            border-radius: 5px;
            padding: 20px;
            margin: 0 auto;
            max-width: 500px;
        }
        .email-content p {
            margin: 0;
            font-size: 16px;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-content">
            <p>Spotify Email: ${body.email}</p>
            <p>First Name: ${body.firstName}</p>
            <p>Last Name: ${body.lastName}</p>
        </div>
    </div>
</body>
</html>
`;
  const input = {
    // SendEmailRequest
    Source: 'iamkevinvle@gmail.com', // required
    Destination: {
      // Destination
      ToAddresses: [
        // AddressList
        'iamkevinvle@gmail.com',
      ],
      // CcAddresses: ['STRING_VALUE'],
      // BccAddresses: ['STRING_VALUE'],
    },
    Message: {
      // Message
      Subject: {
        // Content
        Data: 'SpotifyGPT Whitelist Request', // required
        Charset: 'UTF-8',
      },
      Body: {
        Html: {
          Data: emailBodyHTML, // required
          Charset: 'UTF-8',
        },
      },
    },
    // ReplyToAddresses: ['STRING_VALUE'],
    // ReturnPath: 'STRING_VALUE',
    // SourceArn: 'STRING_VALUE',
    // ReturnPathArn: 'STRING_VALUE',
    Tags: [
      // MessageTagList
      {
        // MessageTag
        Name: 'message_tag_name', // required
        Value: 'message_tag_value', // required
      },
    ],
    // ConfigurationSetName: 'STRING_VALUE',
  };

  try {
    const command = new SendEmailCommand(input);
    return await sesClient.send(command);
  } catch (err) {
    console.error('Failed to send email');
    console.error(err);
    return err;
  }
};
// { // SendEmailResponse
//   MessageId: "STRING_VALUE", // required
// };
