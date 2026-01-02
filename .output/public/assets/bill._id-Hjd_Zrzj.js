import{j as t,a5 as f,w as u,b as v,B as c,t as x}from"./main-DKZ1eiYM.js";import{L as y}from"./Layout-B54LSfe1.js";import{A as N}from"./arrow-left-Dg8cp6vG.js";import{P as j}from"./printer-Cvus_LAl.js";import{D as w}from"./download--oKr8vEp.js";import"./user-ZdgPDPxn.js";function P(){const l=f.useLoaderData(),m=u();if(!l.success||!l.data)return t.jsx("div",{className:"min-h-screen bg-gray-50 flex items-center justify-center",children:t.jsxs("div",{className:"text-center",children:[t.jsx(v,{className:"w-16 h-16 text-red-500 mx-auto mb-4"}),t.jsx("p",{className:"text-xl text-gray-700 mb-4",children:"Bill not found"}),t.jsx("p",{className:"text-sm text-gray-600 mb-6",children:l.error||"Unable to load the requested bill"}),t.jsx(c,{onClick:()=>m({to:"/lab-management"}),children:"Back to Lab Management"})]})});const{bill:a,patient:n,tests:r}=l.data,s=l.lab,p=()=>{const e=document.getElementById("bill-print-content");if(!e)return;const i=window.open("","","width=900,height=700");i&&(i.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Bill - ${a.invoiceNumber}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Arial, sans-serif; }
            @page { size: A4; margin: 15mm; }
            @media print { body { margin: 0; } }
            .container { width: 100%; max-width: 800px; margin: 0 auto; }
            .header { text-align: center; margin-bottom: 20px; }
            .lab-name { font-size: 20px; font-weight: bold; }
            .bill-title { font-size: 16px; font-weight: bold; margin-top: 10px; }
            .section { margin-bottom: 15px; }
            .section-title { font-weight: bold; border-bottom: 1px solid #000; margin-bottom: 5px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f0f0f0; font-weight: bold; }
            .text-right { text-align: right; }
            .total-row { font-weight: bold; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
            .amount-words { margin: 10px 0; font-style: italic; }
          </style>
        </head>
        <body>
          ${e.innerHTML}
        </body>
      </html>
    `),i.document.close(),i.print())},b=async()=>{try{const e={labName:s?.name||"Laboratory",labRegistration:s?.registrationNumber||"",labAddress:s?.address||"",labPhone:s?.contactPhone||"",patientName:n?.name||"N/A",patientAge:n?.age||void 0,patientPhone:n?.phone||void 0,invoiceNumber:a.invoiceNumber,totalAmount:a.totalAmount?.toString()||"0",discount:a.discount?.toString()||"0",tax:a.tax?.toString()||"0",finalAmount:a.finalAmount?.toString()||"0",isPaid:a.isPaid||!1,createdAt:a.createdAt?.toString()||new Date().toISOString(),tests:r?.map(o=>({name:o.testName||o.name||"Test",price:o.price?.toString()||"0"}))||[]},i=`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Bill - ${e.invoiceNumber}</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                background-color: #f5f5f5;
              }
              .bill-container {
                max-width: 800px;
                margin: 0 auto;
                background-color: white;
                padding: 40px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
              }
              .header {
                border-bottom: 3px solid #333;
                padding-bottom: 20px;
                margin-bottom: 30px;
              }
              .lab-name {
                font-size: 28px;
                font-weight: bold;
                color: #333;
                margin: 0;
              }
              .lab-details {
                font-size: 12px;
                color: #666;
                margin-top: 5px;
              }
              .section {
                margin-bottom: 20px;
              }
              .section-title {
                font-weight: bold;
                font-size: 14px;
                color: #333;
                margin-bottom: 10px;
                border-bottom: 1px solid #ddd;
                padding-bottom: 5px;
              }
              .info-row {
                display: flex;
                justify-content: space-between;
                font-size: 13px;
                margin-bottom: 8px;
              }
              .label {
                font-weight: 600;
                color: #555;
                width: 150px;
              }
              .value {
                color: #333;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
              }
              th {
                background-color: #f0f0f0;
                padding: 10px;
                text-align: left;
                font-weight: bold;
                border-bottom: 2px solid #333;
                font-size: 12px;
              }
              td {
                padding: 10px;
                border-bottom: 1px solid #ddd;
                font-size: 12px;
              }
              .totals {
                width: 100%;
                margin-top: 20px;
                border-top: 2px solid #333;
                padding-top: 15px;
              }
              .total-row {
                display: flex;
                justify-content: flex-end;
                margin-bottom: 10px;
                font-size: 13px;
              }
              .total-label {
                width: 150px;
                font-weight: 600;
              }
              .total-value {
                width: 100px;
                text-align: right;
              }
              .final-amount {
                font-size: 18px;
                font-weight: bold;
                color: #2c5282;
                background-color: #f0f7ff;
                padding: 10px;
                border-radius: 5px;
              }
              .payment-status {
                margin-top: 20px;
                padding: 10px;
                border-radius: 5px;
                font-weight: bold;
              }
              .paid {
                background-color: #d4edda;
                color: #155724;
              }
              .unpaid {
                background-color: #f8d7da;
                color: #721c24;
              }
              .footer {
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #ddd;
                text-align: center;
                font-size: 11px;
                color: #666;
              }
            </style>
          </head>
          <body>
            <div class="bill-container">
              <div class="header">
                <p class="lab-name">${e.labName}</p>
                <div class="lab-details">
                  <div>Registration: ${e.labRegistration||"N/A"}</div>
                  ${e.labAddress?`<div>Address: ${e.labAddress}</div>`:""}
                  ${e.labPhone?`<div>Phone: ${e.labPhone}</div>`:""}
                </div>
              </div>

              <div class="section">
                <div class="section-title">Bill Information</div>
                <div class="info-row">
                  <span class="label">Invoice Number:</span>
                  <span class="value">${e.invoiceNumber}</span>
                </div>
                <div class="info-row">
                  <span class="label">Date:</span>
                  <span class="value">${new Date(e.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Patient Information</div>
                <div class="info-row">
                  <span class="label">Patient Name:</span>
                  <span class="value">${e.patientName}</span>
                </div>
                ${e.patientAge?`
                <div class="info-row">
                  <span class="label">Age:</span>
                  <span class="value">${e.patientAge}</span>
                </div>
                `:""}
                ${e.patientPhone?`
                <div class="info-row">
                  <span class="label">Phone:</span>
                  <span class="value">${e.patientPhone}</span>
                </div>
                `:""}
              </div>

              ${e.tests&&e.tests.length>0?`
              <div class="section">
                <div class="section-title">Tests</div>
                <table>
                  <thead>
                    <tr>
                      <th>Test Name</th>
                      <th style="text-align: right;">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${e.tests.map(o=>`
                      <tr>
                        <td>${o.name}</td>
                        <td style="text-align: right;">₹${parseFloat(o.price).toFixed(2)}</td>
                      </tr>
                    `).join("")}
                  </tbody>
                </table>
              </div>
              `:""}

              <div class="totals">
                <div class="total-row">
                  <span class="total-label">Subtotal:</span>
                  <span class="total-value">₹${parseFloat(e.totalAmount).toFixed(2)}</span>
                </div>
                ${e.discount?`
                <div class="total-row">
                  <span class="total-label">Discount:</span>
                  <span class="total-value">-₹${parseFloat(e.discount).toFixed(2)}</span>
                </div>
                `:""}
                ${e.tax?`
                <div class="total-row">
                  <span class="total-label">Tax:</span>
                  <span class="total-value">+₹${parseFloat(e.tax).toFixed(2)}</span>
                </div>
                `:""}
                <div class="total-row final-amount">
                  <span class="total-label">Total Amount:</span>
                  <span class="total-value">₹${parseFloat(e.finalAmount).toFixed(2)}</span>
                </div>
              </div>

              <div class="payment-status ${e.isPaid?"paid":"unpaid"}">
                Payment Status: ${e.isPaid?"PAID":"UNPAID"}
              </div>

              <div class="footer">
                <p>This is a computer-generated bill. No signature required.</p>
                <p>Generated on ${new Date().toLocaleString()}</p>
              </div>
            </div>
          </body>
        </html>
      `,d=window.open("","","width=800,height=600");d&&(d.document.write(i),d.document.close(),setTimeout(()=>{d.print(),x.success('PDF download started. Use "Save as PDF" in the print dialog.')},100))}catch(e){console.error("Error downloading PDF:",e),x.error("Failed to download PDF")}},g=e=>e?new Date(e).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}):"-",h=e=>e?new Date(e).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit"}):"-";return t.jsx("div",{className:"min-h-screen bg-gray-50 p-8",children:t.jsxs("div",{className:"max-w-4xl mx-auto",children:[t.jsxs("div",{className:"flex items-center justify-between mb-8",children:[t.jsxs("div",{className:"flex items-center space-x-4",children:[t.jsxs(c,{onClick:()=>m({to:"/lab-management"}),variant:"outline",className:"flex items-center space-x-2",children:[t.jsx(N,{className:"w-4 h-4"}),t.jsx("span",{children:"Back"})]}),t.jsx("h1",{className:"text-3xl font-bold text-gray-900",children:"Bill Details"})]}),t.jsxs("div",{className:"flex space-x-3",children:[t.jsxs(c,{onClick:p,className:"px-4 py-2 bg-blue-600 hover:bg-blue-700",children:[t.jsx(j,{className:"w-4 h-4 mr-2"}),"Print"]}),t.jsxs(c,{onClick:b,className:"px-4 py-2 bg-green-600 hover:bg-green-700",children:[t.jsx(w,{className:"w-4 h-4 mr-2"}),"Download PDF"]})]})]}),t.jsxs("div",{id:"bill-print-content",className:"bg-white rounded-lg shadow-sm border border-gray-200 p-8",children:[t.jsxs("div",{className:"text-center mb-8 border-b border-gray-300 pb-6",children:[t.jsx("h1",{className:"text-3xl font-bold text-gray-900 mb-2",children:s?.name||"Laboratory"}),t.jsx("p",{className:"text-sm text-gray-600",children:s?.address||"Laboratory Address"}),t.jsxs("p",{className:"text-sm text-gray-600",children:["Registration: ",s?.registrationNumber||"N/A"]}),t.jsxs("p",{className:"text-sm text-gray-600",children:["Phone: ",s?.contactPhone||"N/A"]}),t.jsx("h2",{className:"text-xl font-semibold text-gray-900 mt-4",children:"BILL / INVOICE"})]}),t.jsxs("div",{className:"grid grid-cols-2 gap-8 mb-8",children:[t.jsxs("div",{children:[t.jsx("h3",{className:"font-semibold text-gray-900 mb-3",children:"Bill Information"}),t.jsxs("div",{className:"space-y-2 text-sm",children:[t.jsxs("p",{children:[t.jsx("span",{className:"font-medium text-gray-700",children:"Invoice Number:"}),t.jsx("span",{className:"text-gray-900 ml-2",children:a.invoiceNumber})]}),t.jsxs("p",{children:[t.jsx("span",{className:"font-medium text-gray-700",children:"Date:"}),t.jsx("span",{className:"text-gray-900 ml-2",children:g(a.createdAt)})]}),t.jsxs("p",{children:[t.jsx("span",{className:"font-medium text-gray-700",children:"Time:"}),t.jsx("span",{className:"text-gray-900 ml-2",children:h(a.createdAt)})]})]})]}),t.jsxs("div",{children:[t.jsx("h3",{className:"font-semibold text-gray-900 mb-3",children:"Patient Information"}),t.jsxs("div",{className:"space-y-2 text-sm",children:[t.jsxs("p",{children:[t.jsx("span",{className:"font-medium text-gray-700",children:"Name:"}),t.jsx("span",{className:"text-gray-900 ml-2",children:n?.name||"-"})]}),t.jsxs("p",{children:[t.jsx("span",{className:"font-medium text-gray-700",children:"Age:"}),t.jsx("span",{className:"text-gray-900 ml-2",children:n?.age||"-"})]}),t.jsxs("p",{children:[t.jsx("span",{className:"font-medium text-gray-700",children:"Phone:"}),t.jsx("span",{className:"text-gray-900 ml-2",children:n?.phone||"-"})]})]})]})]}),r&&r.length>0&&t.jsxs("div",{className:"mb-8",children:[t.jsx("h3",{className:"font-semibold text-gray-900 mb-4",children:"Tests"}),t.jsxs("table",{className:"w-full border-collapse border border-gray-300",children:[t.jsx("thead",{children:t.jsxs("tr",{className:"bg-gray-100",children:[t.jsx("th",{className:"border border-gray-300 px-4 py-2 text-left font-semibold",children:"Test Name"}),t.jsx("th",{className:"border border-gray-300 px-4 py-2 text-right font-semibold",children:"Price"})]})}),t.jsx("tbody",{children:r.map((e,i)=>t.jsxs("tr",{className:"hover:bg-gray-50",children:[t.jsx("td",{className:"border border-gray-300 px-4 py-2",children:e.testName||e.name}),t.jsxs("td",{className:"border border-gray-300 px-4 py-2 text-right",children:["₹",parseFloat(e.price||0).toFixed(2)]})]},i))})]})]}),t.jsxs("div",{className:"border-t-2 border-gray-300 pt-4 mb-6",children:[t.jsxs("div",{className:"flex justify-end mb-2",children:[t.jsx("span",{className:"font-medium text-gray-700 w-40",children:"Subtotal:"}),t.jsxs("span",{className:"text-gray-900 w-24 text-right",children:["₹",parseFloat(a.totalAmount||0).toFixed(2)]})]}),a.discount&&a.discount>0&&t.jsxs("div",{className:"flex justify-end mb-2",children:[t.jsx("span",{className:"font-medium text-gray-700 w-40",children:"Discount:"}),t.jsxs("span",{className:"text-gray-900 w-24 text-right",children:["-₹",parseFloat(a.discount).toFixed(2)]})]}),a.tax&&a.tax>0&&t.jsxs("div",{className:"flex justify-end mb-2",children:[t.jsx("span",{className:"font-medium text-gray-700 w-40",children:"Tax:"}),t.jsxs("span",{className:"text-gray-900 w-24 text-right",children:["+₹",parseFloat(a.tax).toFixed(2)]})]}),t.jsxs("div",{className:"flex justify-end border-t border-gray-300 pt-2",children:[t.jsx("span",{className:"font-bold text-gray-900 w-40",children:"Total Amount:"}),t.jsxs("span",{className:"text-lg font-bold text-blue-600 w-24 text-right",children:["₹",parseFloat(a.finalAmount||0).toFixed(2)]})]})]}),t.jsxs("div",{className:`p-4 rounded-lg font-semibold text-center mb-6 ${a.isPaid?"bg-green-100 text-green-800":"bg-red-100 text-red-800"}`,children:["Payment Status: ",a.isPaid?"PAID":"UNPAID"]}),t.jsxs("div",{className:"border-t border-gray-300 pt-4 text-center text-xs text-gray-600",children:[t.jsx("p",{children:"This is a computer-generated bill. No signature required."}),t.jsxs("p",{children:["Generated on ",new Date().toLocaleString()]})]})]})]})})}const I=()=>t.jsx(y,{requiredRole:["admin","cashier","lab_tech"],children:t.jsx(P,{})});export{I as component};
