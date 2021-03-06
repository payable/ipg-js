### PAYable IPG JS

PAYable IPG JS helps to integrate the payment gateway of your website.

<hr>

### Version V2.0.1.4

#### The Payable Payment Gateway Integration

First, You need to get the Merchant Key and Merchant Token to integrate with the IPG JS from Payable.

- Merchant Key:
- Merchant Token:

You can simply use an HTML Form to submit the below params to Payable Payment Gateway.When your customer clicks on the payment/checkout button, It will be redirected to the Payable Payment Gateway. The Customer can confirm the payment by clicking on the 'continue' button. Then your customer will be securely redirected to the commercial bank Payment Gateway and the customer can then enter the credentials (Card No / Cardholder name / CVV ) and process the payment there. Once the payment is made, The payable payment gateway will show the payment status to your customer and send the receipt to your customer's email.

<hr>

### Implementation

<b>1.</b> Install [Payable IPG JS](https://www.npmjs.com/package/@payable/ipg-js) package in your project.

<b>1.1. </b>Run the following command inside your project.

```javascript
npm i @payable/ipg-js
```
<b>1.2. </b>Import the Payable IPG JS package.

```javascript
import payable from '@payable/ipg-js';
```

<b>2.</b> Create your payment request with basic required fields.

<b>2.1.</b> Required Form Parameters:

- `notify_url` - URL to callback the status of the payment (Needs to be a URL accessible on a public IP/domain)
- `return_url` - URL to redirect users when success
- `cancel_url` - URL to redirect users when cancelled
- `merchant_key` - Payable Merchant ID [Given by PAYable]
- `currency_code` - Currency Code (LKR)
- `check_value` - Generated hash value to ensure extra security
- `order_description` - Small Description for the Order
- `amount` - Total Payment Amount
- `invoice_id` - Invoice ID generated by the merchant
- `customer_first_name`- Customer’s First Name
- `customer_last_name` - Customer’s Last Name
- `customer_mobile_phone`- Customer’s Mobile No
- `customer_phone` - Customer’s Phone No
- `customer_email` - Customer’s Email
- `billing_address_street` - Billing Address Line1
- `billing_address_city`- Billing City
- `billing_address_province` - Billing Province
- `billing_address_country` - Billing Country (LKA)
- `billing_address_postcode` - Billing Postal Code

<b>2.2.</b> Optional Form Parameters:

- `custom_1` - Merchant specific data, a Custom 1
- `custom_2` - Merchant specific data, a Custom 2
- `billing_address_street2` - Billing Address Line2
- `billing_address_company` - Billing Company
- `shipping_contact_first_name` - Shipping Contact First Name
- `shipping_contact_last_name` - Shipping Contact Last Name
- `shipping_contact_mobile` - Shipping Contact Mobile No
- `shipping_contact_phone ` - Shipping Contact Phone No
- `shipping_contact_email` - Shipping Contact Email
- `shipping_address_company` - Shipping Contact Company
- `shipping_address_street` - Shipping Address Line1
- `shipping_address_street2` - Shipping Address Line2
- `shipping_address_city` - Shipping City
- `shipping_address_province` - Shipping Province
- `shipping_address_country` - Shipping Country (LKA)
- `shipping_address_postcode` - Shipping Postal Code

In Request, `check_value` is a combination of merchant key, invoice id, amount, currency parameter set in a predefined sequence given by PAYable which then encrypted with merchant token (a unique Secret value for the Merchant which was shared by PAYable) using SHA-512.

Format:

`UPPERCASE(SHA512[<merchant_key>|<invoice_id>|<amount>|<currency_code>|UPPERCASE(SHA512[<merchant_Token>])])`

<b>2.3.</b> Sample Code :
````javascript
const payment = {
    cancel_url: "https://yoursite.com/payment/cancel",
    return_url: "https://yoursite.com/payment/return",
    notify_url: "https://yoursite.com/payment/nortify",
    merchant_key: "D7XXXXXXXXX",               
    check_value: "C6FXXXXXXXXXXXXXXXXXXXXXX",
    amount: "59.91",
    invoice_id: "INVvw5EA0d1pH",            
    order_description: "Payment for ABC Fashion Shop",
    currency_code: "LKR",
    custom_1: "customYuDSFk5Z1O",
    custom_2: "test2",
    customer_email: "testmail@gmail.com",
    customer_first_name: "Shakthi",
    customer_last_name: "Elon",
    customer_mobile_phone: "07XXXXXXXX",
    customer_phone: "07XXXXXXXX",
    billing_address_city: "Vavuniya",
    billing_address_company: "Pay Shop",
    billing_address_country: "LKA",
    billing_address_postcode: "43000",
    billing_address_province: "North Province",
    billing_address_street: "154",
    billing_address_street2: "Koomankulam", 
    shipping_address_city: "Colombo",
    shipping_address_company: "Payable",
    shipping_address_country: "LKA",
    shipping_address_postcode: "43000",
    shipping_address_province: "western province",
    shipping_address_street: "Main street",
    shipping_address_street2: "Temple road",
    shipping_contact_email: "testshipmail@gmail.com",
    shipping_contact_first_name: "Kumaran",
    shipping_contact_last_name: "Test Lastname",
    shipping_contact_mobile: "07XXXXXXXX",
    shipping_contact_phone: "07XXXXXXXX"
  };

   ````

<b>3.</b> Communicate with PAYable IPG JS.

<b>3.1.</b> Submit your payment request into `payable.startPayment()`.

```javascript
 // Env set - sandbox env sandboxMode = true, Live env sandboxMode = false
 payable.sandboxMode = true

 payable.startPayment(payment);

```
<b>3.2.</b> Payment related Error details.

You can get the error details from the `payable.onError`. Error will be field validation (code : 3009) and other common errors (code : 3008).

```javascript
   payable.onError = function onError(error) {
    if (error.code === 3009) { // field validation error
      error.fields.forEach((field) => {
        console.log(field.error)
      });
    }
    if (error.code === 3008) {
      console.log(error.error)
    }
  };

```

<b>3.3.</b> Listening to Payable Payment Gateway

Once you connect to Payable Payment Gateway, You can listen to payment gateway with `payable.onCompleted`(The payment can be successful or failed) and `payable.onDismissed`(The user closes the payment without completing). As soon as the payment is processed, You can get the payment process status. `payable.onCompleted` .

```javascript
   payable.onCompleted = function onCompleted(data) {
    console.log("Payment Process Completed");
  };

```

If the payment gateway dismissed you can get the connection status.

```javascript
   payable.onDismissed = function onDismissed() {
    console.log("Payment Process Canceled");
  };

```

<hr> 

#### Listening to Payment Notification Data

Payable Payment Gateway will send back to your website notifies the payment status to the `notify_url`. You need to get the request and send the response.

- It cannot test the payment notification by print/echo methods since `notify_url` never 
loads to the browser as it's a server callback. You can only test it by updating your database upon 
fetching the notification.
- It cannot test the payment notification on localhost. You need to submit a publicly accessible IP or 
domain based URL as your `notify_url` is to directly notify your server.
- No payment status parameters are passed to the `return_url` when redirecting the customer 
back to the Merchant’s website. You need to update your database upon fetching payment status by 
your script on `notify_url` & then show the payment status to the customer in the page on 
`return_url` by fetching the status from your database.


##### Server callback Json

```json
{
    "merchantKey": "SXXXXXXXX",
    "payableOrderId": "oid-XXXXXXXX-XXX-XXXX-XXXX-XXXX",
    "payableTransactionId": "XXXXXXXX-XXX-XXXX-XXXX-XXXXXXXXX",
    "payableAmount": "1000.60",
    "payableCurrency": "LKR",
    "invoiceNo": "INVvw5EA0d1pH",
    "statusCode": 1,
    "statusMessage": "SUCCESS",
    "paymentType": 1,
    "paymentMethod": 1,
    "paymentScheme": "MASTERCARD",
    "custom1": "test 1",
    "custom2": "test 2",
    "cardHolderName": "Shakthi",
    "cardNumber": "512345xxxxxx0008",
    "checkValue": "256XXXXXXXXXXXXXX"
}
```
##### Description

- `merchantKey` - PAYable Merchant Key of the Merchant 
- `payableOrderId` - Unique Order Id generated by PAYable
- `payableTransactionId` - Unique Transaction Reference Id generated by PAYable for the processed payment
- `payableAmount`- Total amount of the Payment
- `payableCurrency` - Currency Code of the Payment (LKR Only)
- `invoiceNo` - Unique Id sent by Merchant to the Checkout page
- `statusCode` - Payment status code (1 - if payment is SUCCESS, 2- if payment is FAILURE)
- `statusMessage` - Message received from payment gateway which the customer tried to pay
- `paymentType` - Payment type selected during the Checkout
    1. CARD (SUPPORTED)
    2. BANKING (Not implemented yet)
    3. WALLET (Not implemented yet)
- `paymentMethod` - Payment method selected during the Checkout
    1. VISA / MASTERCARD / CUP(Visa and Mastercard are SUPPORTED / CUP Not implemented Yet)
    2. AMEX / DINERS CLUB / DISCOVER (Not implemented yet)
    3. SAMPATH VISHWA (Not implemented yet)
- `paymentScheme` - Payment scheme selected by the customer (VISA / MASTERCARD)
- `custom1` - Custom param 1 sent by merchant to Checkout page
- `custom2` - Customparam 2 sent by merchant to Checkout page

If the customer made the payment by VISA or MASTER credit/debit card, following cardHolderName and cardNumber parameters will also be available.
- `cardHolderName` -Name on the Card
- `cardNumber` - Masked card number (Ex: ************0008)
- `checkValue` - combination of merchantKey, payableOrderId, payableTransactionId, payableAmount, payableCurrency, invoiceId, statusCode parameter set in a predefined sequence given by PAYable which then encrypted with merchantToken (a unique Secret value for the Merchant which was shared by PAYable) using SHA-512. 

    Format:

    `UPPERCASE(SHA512[<MerchantKey>|<payableOrderId>|<payableTransactionId>|<payableAmount>|<payableCurrency>|<invoiceId>|<statusCode>|UPPERCASE(SHA512[<MerchantToken>])])`

##### Send response to callback

```json
{
    "Status":200
}
```


PAYable Payment Gateway Integration
