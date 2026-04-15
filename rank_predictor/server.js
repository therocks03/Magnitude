const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
// increase limit because HTML with lots of colleges can be large
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(__dirname));

app.post('/api/export-pdf', async (req, res) => {
    try {
        const resultsHtml = req.body.html;

        const fullHtml = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Export</title>
                <link rel="stylesheet" href="http://localhost:3000/style.css">
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
                <script src="https://unpkg.com/@phosphor-icons/web"></script>
                <style>
                    body {
                        background: #0d0f14;
                        color: #ffffff;
                        padding: 0;
                        margin: 0;
                        min-height: 100vh;
                        font-family: 'Inter', sans-serif;
                    }
                    /* Ensure background abstraction gradients print */
                    .bg-abstract {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100vw;
                        height: 100vh;
                        z-index: -1;
                        overflow: hidden;
                    }
                    #view-results {
                        display: block !important;
                        opacity: 1 !important;
                        visibility: visible !important;
                        padding: 40px;
                        margin: 0 auto;
                        max-width: 800px;
                    }
                    .results-actions {
                        display: none !important;
                    }
                    /* Force glassmorphism borders and backgrounds on print */
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                </style>
            </head>
            <body>
                <div class="bg-abstract">
                    <div class="blob blob-1"></div>
                    <div class="blob blob-2"></div>
                    <div class="blob blob-3"></div>
                </div>
                <!-- Wrap in results view so inner scopes apply perfectly -->
                <section id="view-results" class="view">
                    ${resultsHtml}
                </section>
            </body>
            </html>
        `;

        const browser = await puppeteer.launch({ 
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox'] 
        });
        
        const page = await browser.newPage();
        
        // Wait for all network requests (fonts, scripts) to finish down to 0 active connections
        await page.setContent(fullHtml, { waitUntil: 'networkidle0' });
        
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '0', bottom: '0', left: '0', right: '0' }
        });
        
        await browser.close();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="magnitude-college-predictions.pdf"');
        res.send(Buffer.from(pdfBuffer));
    } catch (error) {
        console.error("PDF generation error:", error);
        res.status(500).send("Error generating PDF");
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`PDF Backend Server running at http://localhost:${PORT}`);
});
