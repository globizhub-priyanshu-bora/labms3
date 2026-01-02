import{j as e,a6 as j,w as f,b as u,B as x}from"./main-U2sX-pZG.js";import{L as N}from"./Layout-gOgl803z.js";import{A as v}from"./arrow-left-DAmfK1Qr.js";import{P as w}from"./printer-Cj--mqq2.js";import{D as A}from"./download-DdiRs2kC.js";function h(r){if(r===0)return"Zero";const o=["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine"],i=["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"],s=["Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];function a(t){return t===0?"":t<10?o[t]:t<20?s[t-10]:t<100?i[Math.floor(t/10)]+(t%10!==0?" "+o[t%10]:""):o[Math.floor(t/100)]+" Hundred"+(t%100!==0?" "+a(t%100):"")}if(r<1e3)return a(r);if(r<1e5){const t=Math.floor(r/1e3),d=r%1e3;return a(t)+" Thousand"+(d!==0?" "+a(d):"")}if(r<1e7){const t=Math.floor(r/1e5),d=r%1e5;return a(t)+" Lakh"+(d!==0?" "+h(d):"")}return"Number too large"}function T(){const r=j.useLoaderData(),o=f();if(!r.success||!r.data)return e.jsx("div",{className:"min-h-screen bg-gray-50 flex items-center justify-center",children:e.jsxs("div",{className:"text-center",children:[e.jsx(u,{className:"w-16 h-16 text-red-500 mx-auto mb-4"}),e.jsx("p",{className:"text-xl text-gray-700 mb-4",children:"Bill not found"}),e.jsx("p",{className:"text-sm text-gray-600 mb-6",children:r.error||"Unable to load the requested bill"}),e.jsx(x,{onClick:()=>o({to:"/lab-management"}),children:"Back to Lab Management"})]})});const{bill:i,lab:s,patient:a,tests:t}=r.data,d=l=>{if(!l)return"-";const n=new Date(l);return`${n.toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"})} ${n.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0})}`},c=parseFloat(i.totalAmount),m=c*parseFloat(i.discount||"0")/100,p=(c-m)*parseFloat(i.tax||"0")/100,g=parseFloat(i.finalAmount),b=h(Math.floor(g))+" Rupees",y=()=>{const l=document.getElementById("bill-print-content");if(!l)return;const n=window.open("","","width=1000,height=800");if(!n)return;n.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Bill - ${i.invoiceNumber}</title>
          
      <style>
        @page {
          size: A4;
          margin: 10mm;
        }
        * { 
          margin: 0; 
          padding: 0; 
          box-sizing: border-box; 
        }
        body { 
          font-family: Arial, sans-serif; 
          background: white;
        }
        .bill-container {
          width: 100%;
          max-width: 210mm;
          margin: 0 auto;
        }
        .border-2 { border: 2px solid #000; }
        .border { border: 1px solid #000; }
        .border-b-2 { border-bottom: 2px solid #000; }
        .border-b { border-bottom: 1px solid #000; }
        .border-r { border-right: 1px solid #000; }
        .border-t-2 { border-top: 2px solid #000; }
        .border-t { border-top: 1px solid #000; }
        .p-6 { padding: 16px; }
        .p-4 { padding: 12px; }
        .p-3 { padding: 8px; }
        .py-3 { padding-top: 8px; padding-bottom: 8px; }
        .py-2 { padding-top: 6px; padding-bottom: 6px; }
        .py-1 { padding-top: 4px; padding-bottom: 4px; }
        .px-4 { padding-left: 12px; padding-right: 12px; }
        .px-3 { padding-left: 8px; padding-right: 8px; }
        .px-2 { padding-left: 6px; padding-right: 6px; }
        .px-8 { padding-left: 24px; padding-right: 24px; }
        .mt-4 { margin-top: 12px; }
        .mt-3 { margin-top: 8px; }
        .mt-2 { margin-top: 6px; }
        .mt-1 { margin-top: 4px; }
        .mb-3 { margin-bottom: 8px; }
        .mb-2 { margin-bottom: 6px; }
        .mb-1 { margin-bottom: 4px; }
        .text-3xl { font-size: 24px; line-height: 1.2; }
        .text-xl { font-size: 16px; line-height: 1.4; }
        .text-lg { font-size: 14px; }
        .text-base { font-size: 13px; }
        .text-sm { font-size: 11px; }
        .text-xs { font-size: 10px; }
        .font-bold { font-weight: 700; }
        .font-semibold { font-weight: 600; }
        .font-medium { font-weight: 500; }
        .uppercase { text-transform: uppercase; }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .text-left { text-align: left; }
        .flex { display: flex; }
        .justify-between { justify-content: space-between; }
        .justify-center { justify-content: center; }
        .justify-end { justify-content: flex-end; }
        .items-start { align-items: flex-start; }
        .items-center { align-items: center; }
        .grid { display: grid; }
        .grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
        .grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
        .col-span-2 { grid-column: span 2; }
        .gap-2 { gap: 6px; }
        .gap-1 { gap: 4px; }
        .space-y-2 > * + * { margin-top: 6px; }
        .space-y-3 > * + * { margin-top: 8px; }
        .space-y-1 > * + * { margin-top: 4px; }
        .bg-red-600 { background-color: #dc2626; color: white; }
        .bg-gray-50 { background-color: #f9fafb; }
        .bg-gray-100 { background-color: #f3f4f6; }
        .text-red-600 { color: #dc2626; }
        .text-gray-900 { color: #111827; }
        .text-gray-700 { color: #374151; }
        .text-gray-600 { color: #4b5563; }
        .w-full { width: 100%; }
        .w-64 { width: 280px; }
        table { 
          border-collapse: collapse; 
          width: 100%; 
        }
        th, td {
          padding: 0;
        }
        @media print {
          body { 
            padding: 0; 
          }
        }
      </style>
    
        </head>
        <body>
          <div class="bill-container">
            ${l.innerHTML}
          </div>
        </body>
      </html>
    `),n.document.close(),setTimeout(()=>{n.print(),n.close()},250)};return e.jsx("div",{className:"min-h-screen bg-gray-50",children:e.jsxs("div",{className:"max-w-5xl mx-auto px-6 py-6",children:[e.jsxs("div",{className:"mb-6 flex justify-between items-center",children:[e.jsxs(x,{onClick:()=>o({to:"/lab-management"}),className:"px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white",children:[e.jsx(v,{className:"w-4 h-4 mr-2"}),"Back"]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsxs(x,{onClick:y,className:"px-4 py-2 bg-black hover:bg-gray-800 text-white",children:[e.jsx(w,{className:"w-4 h-4 mr-2"}),"Print"]}),e.jsxs(x,{onClick:()=>{const l=document.getElementById("bill-print-content");if(l){const n=document.createElement("a");n.href="data:text/html,"+encodeURIComponent(l.innerHTML),n.download=`bill-${i.invoiceNumber}.html`,n.click()}},className:"px-4 py-2 bg-black hover:bg-gray-800 text-white",children:[e.jsx(A,{className:"w-4 h-4 mr-2"}),"Download"]})]})]}),e.jsxs("div",{id:"bill-print-content",className:"bg-white border-2 border-gray-900",children:[e.jsxs("div",{className:"border-b-2 border-gray-900 p-4",children:[e.jsxs("div",{className:"flex justify-between items-start",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"text-2xl font-bold text-gray-900 uppercase",children:s?.name||"LAB NAME"}),s?.addressLine1&&e.jsx("p",{className:"text-xs text-gray-700 mt-1",children:s.addressLine1}),(s?.city||s?.state)&&e.jsx("p",{className:"text-xs text-gray-700",children:[s?.city,s?.state].filter(Boolean).join(", ")}),s?.country&&e.jsx("p",{className:"text-xs text-gray-700",children:s.country}),s?.phoneNumber&&e.jsxs("p",{className:"text-xs text-gray-700 mt-1",children:["Tel: ",s.phoneNumber]})]}),e.jsx("div",{className:"text-right",children:s?.email&&e.jsx("p",{className:"text-xs text-gray-700",children:s.email})})]}),e.jsxs("div",{className:"mt-3 flex justify-between text-xs text-gray-600",children:[e.jsx("span",{}),e.jsxs("div",{className:"text-right",children:[s?.gstinNumber&&e.jsx("div",{children:s.gstinNumber}),s?.registrationNumber&&e.jsx("div",{children:s.registrationNumber})]})]})]}),e.jsx("div",{className:"text-center py-2 border-b border-gray-900",children:e.jsx("h2",{className:"text-lg font-bold text-gray-900",children:"LABORATORY BILL"})}),e.jsxs("div",{className:"grid grid-cols-2 border-b border-gray-900",children:[e.jsxs("div",{className:"border-r border-gray-900 p-3",children:[e.jsx("h3",{className:"font-bold text-xs text-gray-900 mb-2",children:"PATIENT DETAILS"}),e.jsxs("div",{className:"space-y-1 text-xs",children:[e.jsxs("div",{className:"grid grid-cols-3 gap-1",children:[e.jsx("span",{className:"text-gray-600",children:"Name:"}),e.jsx("span",{className:"col-span-2 font-medium text-gray-900",children:a?.name||"-"})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-1",children:[e.jsx("span",{className:"text-gray-600",children:"Age/Gender:"}),e.jsxs("span",{className:"col-span-2 font-medium text-gray-900",children:[a?.age||"-"," / ",a?.gender||"-"]})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-1",children:[e.jsx("span",{className:"text-gray-600",children:"Phone:"}),e.jsx("span",{className:"col-span-2 font-medium text-gray-900",children:a?.phoneNumber||"-"})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-1",children:[e.jsx("span",{className:"text-gray-600",children:"Address:"}),e.jsx("span",{className:"col-span-2 font-medium text-gray-900",children:[a?.addressLine1,a?.city,a?.state,a?.pincode].filter(Boolean).join(", ")||"-"})]})]})]}),e.jsxs("div",{className:"p-3",children:[e.jsx("h3",{className:"font-bold text-xs text-gray-900 mb-2",children:"BILL DETAILS"}),e.jsxs("div",{className:"space-y-1 text-xs",children:[e.jsxs("div",{className:"grid grid-cols-3 gap-1",children:[e.jsx("span",{className:"text-gray-600",children:"Patient ID:"}),e.jsx("span",{className:"col-span-2 font-medium text-gray-900",children:a?.id})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-1",children:[e.jsx("span",{className:"text-gray-600",children:"Bill No:"}),e.jsx("span",{className:"col-span-2 font-medium text-gray-900",children:i.invoiceNumber})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-1",children:[e.jsx("span",{className:"text-gray-600",children:"Bill Date:"}),e.jsx("span",{className:"col-span-2 font-medium text-gray-900",children:d(i.createdAt)})]})]})]})]}),e.jsxs("div",{className:"p-3",children:[e.jsx("h3",{className:"font-bold text-xs text-gray-900 mb-2",children:"DETAILS"}),e.jsxs("table",{className:"w-full text-xs border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-900",children:[e.jsx("th",{className:"text-left py-1 px-2 text-gray-900 font-bold",children:"Service Name"}),e.jsx("th",{className:"text-right py-1 px-2 text-gray-900 font-bold",children:"Amount (₹)"})]})}),e.jsx("tbody",{children:t&&t.length>0?t.map((l,n)=>e.jsxs("tr",{className:"border-b border-gray-300",children:[e.jsx("td",{className:"py-1 px-2 text-gray-900",children:l.test?.name||"-"}),e.jsxs("td",{className:"text-right py-1 px-2 text-gray-900",children:["₹",(c/t.length).toFixed(2)]})]},n)):e.jsx("tr",{children:e.jsx("td",{colSpan:2,className:"py-3 px-2 text-center text-gray-600",children:"No tests found"})})})]})]}),e.jsx("div",{className:"border-t-2 border-gray-900 mt-2",children:e.jsx("div",{className:"flex justify-end p-3",children:e.jsx("div",{className:"w-64",children:e.jsxs("div",{className:"space-y-1 text-xs",children:[e.jsxs("div",{className:"flex justify-between py-1",children:[e.jsx("span",{className:"text-gray-900",children:"Subtotal:"}),e.jsxs("span",{className:"text-gray-900 font-medium",children:["₹",c.toFixed(2)]})]}),m>0&&e.jsxs("div",{className:"flex justify-between py-1",children:[e.jsxs("span",{className:"text-gray-900",children:["Discount (",i.discount,"%):"]}),e.jsxs("span",{className:"text-red-600 font-medium",children:["-₹",m.toFixed(2)]})]}),p>0&&e.jsxs("div",{className:"flex justify-between py-1",children:[e.jsxs("span",{className:"text-gray-900",children:["Tax (",i.tax,"%):"]}),e.jsxs("span",{className:"text-gray-900 font-medium",children:["+₹",p.toFixed(2)]})]}),e.jsxs("div",{className:"flex justify-between py-1 border-t-2 border-gray-900",children:[e.jsx("span",{className:"text-gray-900 font-bold text-sm",children:"Bill Amount:"}),e.jsxs("span",{className:"text-gray-900 font-bold text-sm",children:["₹",g.toFixed(2)]})]})]})})})}),e.jsx("div",{className:"border-t border-gray-900 p-3 bg-gray-50",children:e.jsxs("div",{className:"text-xs",children:[e.jsx("span",{className:"text-gray-600",children:"In Words: "}),e.jsxs("span",{className:"font-medium text-gray-900",children:[b," Only"]})]})}),e.jsx("div",{className:"border-t border-gray-900 p-3",children:e.jsxs("div",{className:"text-xs text-gray-600 text-center",children:[e.jsx("p",{className:"mb-1",children:"This is a computer generated statement and requires no signature."}),e.jsx("p",{children:"For billing and general enquiries, please contact us."})]})}),e.jsxs("div",{className:"border-t-2 border-gray-900 bg-gray-100 p-2 text-center text-xs text-gray-600",children:["© ",s?.name||"Lab Name"," ",new Date().getFullYear(),". All Rights Reserved"]})]})]})})}const E=()=>e.jsx(N,{requiredRole:["admin","cashier","lab_tech"],children:e.jsx(T,{})});export{E as component};
