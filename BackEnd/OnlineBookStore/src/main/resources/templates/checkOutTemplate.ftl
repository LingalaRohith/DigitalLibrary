<html xmlns="http://www.w3.org/1999/xhtml">
<head>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
   <title>Book Store</title>
   <style>
      body {
         background-color: #f5f5f5;
         margin: 0;
         padding: 0;
      }
      
      .container {
         max-width: 600px;
         margin: 0 auto;
         padding: 20px;
         background-color: #ffffff;
         font-family: Arial, Helvetica, sans-serif;
         font-size: 16px;
         color: #333333;
      }
      
      .button {
         display: inline-block;
         padding: 10px 20px;
         background-color: #007bff;
         color: #ffffff;
         text-decoration: none;
         border-radius: 4px;
      }
      
      h6 {
         font-size: 24px;
      }
      
      h3 {
         margin-top: 20px;
         color: #007bff;
      }
      img{
      	width:200px;
      	height:200px;
      }
      table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        th {
            background-color: #f2f2f2;
        }
   </style>
</head>
<body>
   <div class="container">
      <h6>Hi <b>${name}</b>,</h6>
      <br/>
      <h3>You order has been placed. </h3>
      <h3>The confirmation Number is : ${confirmationNo}</h3>
      <h3>Your Order is </h3>
      <table>
        <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
        </tr>
        <#list books as item>
            <tr>
                <td>${item.title}</td>
                <td>$${item.selling_Price} </td>
                <td>${item.quantity}</td>
                <td>$${item.total_book}</td>
            </tr>
        </#list>
    </table>
      
    <h3>Your Billing Address is </h3>
    <ul>
        <#list address as addr>
        
        <li>Street: ${addr.street}</li>
        <li>City: ${addr.city}</li>
        <li>State: ${addr.state}</li>
        <li>ZipCode: ${addr.zipCode}</li>
        </#list>
    </ul>
         <h3>The total amount is $${total}</h3>
      <p>Please track your order in order history.</p>
      <br/><br/>
      <p>Thank you.</p>
   </div>
</body>
</html>
