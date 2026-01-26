const html = `
    <div class="footer__copyright row" style="justify-content: center">
        <div class="cell" style="padding: 1rem;" >
            <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png"></a>
        </div>
        <div class="cell" style="padding: 0.1rem; text-align: left;" >
            Licensed under a <a class="footer__link-item" rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons BY-SA 4.0</a> License, if not stated otherwise.<br />
            Copyright © ${new Date().getFullYear()} NFDI4Chem. Built with Docusaurus.
        </div>
    </div>
`;

module.exports = html;