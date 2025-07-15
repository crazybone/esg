export function generateSignature(data) {
  const { firstName, lastName, nickname, position, email, phoneNumber, country, logo, banner, department, departments, countries } = data;

  // Find the selected country object
  const countryObj = countries.find(c => c.code === country || c.name === country);
  const countryCode = countryObj ? countryObj.code : '';
  const formattedPhone = formatPhoneNumber(countryCode, phoneNumber);

  // Get address of selected country
  const selectedCountryAddress = countryObj ? countryObj.address : '';

  // Generate country list with selected country in bold
  const countryList = countries
    .map(c => {
      const isSelected = c.code === country || c.name === country;
      return isSelected
        ? `<b style="color:#505050;">${c.name}</b>`
        : c.name;
    })
    .join('&nbsp;&nbsp;|&nbsp;&nbsp;');

  const bannerContent = banner && department
    ? departments.find(d => d.id === department)?.banners.find(b => b.bannerid === banner)?.content || ''
    : '';

  return ` 
    
  <table role="presentation" style="width:640px;border:0;border-spacing:0;" cellspacing="0" cellpadding="0" border="0" width="100%">
    <tr>
      <td style="background-color:transparent;">                  
        <div style="margin:0 auto;padding:0 20px;background-color:#95d3ff;border-radius: 6px 6px 0 0;height:55px;">
          <p style="margin:0;padding:10px 0">To:&ensp;<span style="color: rgb(54, 96, 131);display: inline-block;background:#ffffff;padding: 10px 15px;border-radius:30px;">Lovely Client</span></p>
        </div>
      </td>
    </tr>
    <tr>
      <td style="background-color:#95d3ff;border-top:1px solid #ffffff">                 
        <div style="margin:0 auto;padding:0 20px;height:40px;line-height:40px;">
        <p>Subject:&ensp; Hello again from aCommerce</p>
        </div>
      </td>
    </tr>
    <tr>
      <td style="background-color:#ffffff;" height="200">
        <div class="message" style="margin:0 auto;width:90%;color:#a8a8a8"><p> Hi Client,<br><br>Check out this awesome new email signature I created. We are thrill to introduce you to this amazing features. Check out this awesome new email signature I created.<br><br>Best regards,</p></div>
      </td>
    </tr>
    <tr>
      <td align="center" style="background-color:#ffffff;">
        <!--[if mso]>
        <table role="presentation" align="center" style="width:660px;" cellspacing="0" cellpadding="0" border="0">
        <tr>
        <td style="padding:20px 0;">
        <![endif]-->
        <div style="max-width:640px;margin:0 auto 20px;padding: 0 20px;">
          <div id="signature-container" style="text-align:center;font-size:0;">
            <!--[if mso]>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="width:100%;padding:10px;" valign="middle">
            <![endif]-->
                  <div style="width:100%;max-width:240px;display:block;vertical-align:middle;;">
                      <div id="left-content" style="padding:10px 10px 10px 0;font-size:12px;text-align:left;">

                        <!-- content here-->
                        <table role="presentation" width="100%">
                          <tr>
                            <td style="padding:0;" valign="middle">
                              <p class="sender-name" style="margin:0;margin-top:8px;font-weight:bold;line-height:18px;color:#505050;">${firstName} ${lastName} ${nickname ? `(${nickname})` : ''}</p>
                              <p class="sender-title" style="margin:0;font-weight:400;line-height:18px;color:#909090;">${position}</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:0;" valign="middle">
                              <p class="sender-email" style="margin:0;margin-top:8px;font-weight:400;line-height:18px;color:#909090;"><b>E: </b><a style="text-decoration:none;color:#909090;" class="mailto" href="mailto:${email}">${email}</a></p>
                              <p class="sender-phone" style="margin:0;font-weight:400;line-height:18px;color:#909090;"><b>M: </b><span id="sender-phone">${formattedPhone}</span></p>
                            </td>
                          </tr>
                        </table>                      
                      </div>
                  </div>
            <!--[if mso]>
                </td>
              </tr>
              <tr>
                <td style="width:100%;padding:10px;" valign="middle">
            <![endif]-->
            <!--[if mso]>
                </td>
              </tr>
              <tr>
                <td style="width:100%;padding:10px;" valign="middle">
            <![endif]-->
              <table role="presentation" width="60%">
                <tr>
                  <td style="width:50%;padding:0 10px 0 0;" valign="middle">
                      <div style="display:block;width:50%;height:100%;">
                        <!-- <a href="" target="_blank" style="display:block;"> -->
                          <img src="${logo}" width="200" alt="aCommerce"/>
                        <!-- </a> -->
                      </div>
                  </td>
                  <td style="width:50%;padding:0 10px 0 0;" valign="middle">
                  <ul style="list-style:none;margin:0;padding:0;display:inline-block;float:right;">
      <li class="social-icon" style="display:inline-block;width:25px;">
        <a href="https://www.facebook.com/acommerce.asia/">
          <img src="/assets/fb-r-30.jpg" alt="Facebook" width="20" class="sender-fb">
        </a>
      </li>
      <li class="social-icon" style="display:inline-block;width:25px;">
        <a href="https://www.linkedin.com/company/acommerce/">
          <img src="/assets/li-r-30.jpg" alt="LinkedIn" width="20" class="sender-fb">
        </a>
      </li>
    </ul>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="width:100%;padding:0 10px 0 0;">
                    <p class="sender-address" style="margin:0 0 5px;padding:0;display:block;font-size:12px;font-weight:400;line-height:18px;color:#909090;"><b>A: </b>${selectedCountryAddress}</p>
                    <p style="margin:0;font-size:12px;font-weight:400;line-height:18px;color:#909090;" id="country-list">${countryList}</p>
                  </td>
                </tr>                
              </table>
            <!--[if mso]>
                </td>
            </tr>
          </table>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" >
            <tr>
              <td style="width:100%;padding:10px;" valign="middle">
          <![endif]-->
              <table role="presentation" style="margin-top:20px;width:100%;border:0;border-spacing:0;" cellspacing="0" cellpadding="3" border="0" width="100%">
                <tr id="banner-container">${bannerContent}</tr>
              </table>
            <!--[if mso]>
                </td>
              </tr>
            </table>
            <![endif]-->
          </div>
      </div>
      <!--[if mso]>
      </td>
      </tr>
      </table>
      <![endif]-->
      </td>
    </tr>
    <tr>
      <td style="background-color:transparent;" height="50">
        <div style="margin:0 auto;padding:0 20px;background-color:#ffffff;border-radius: 0 0 6px 6px;height:55px;"><br/>
        </div>
      </td>
    </tr>
  </table>
  `;
}

function formatPhoneNumber(countryCode, phoneNumber) {
  if (!countryCode || !phoneNumber) return '';
  // Remove leading zero
  let cleaned = phoneNumber.trim();
  if (cleaned.startsWith('0')) {
    cleaned = cleaned.slice(1);
  }
  // Remove non-digits
  cleaned = cleaned.replace(/\D/g, '');
  // Format as 2-3-4 digit groups (customize as needed)
  const formatted = cleaned.replace(/^(\d{2})(\d{3})(\d{4})$/, '$1 $2 $3');
  // Remove '+' if present in countryCode, then add '+'
  const code = countryCode.replace(/^\+/, '');
  return `+${code} ${formatted}`;
}