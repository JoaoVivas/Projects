import express from 'express';

const app = express();

app.listen(3000);

let fs = require('fs'),
PDFParser = require("pdf2json");

let pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
fs.writeFile("./pdf2json/test/F1040EZ.json", JSON.stringify(pdfData));
});

pdfParser.loadPDF("./pdfs/edital_e_tab_veiculo_belo horizonte_2134_2021.pdf");