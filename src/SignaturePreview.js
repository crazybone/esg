import React, { useState } from 'react';
import { Box, Typography, Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { generateSignature } from './generateSignature';

import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
//import IconButton from '@mui/material/IconButton';

function SignaturePreview({ formData, departments, countries, loading, error }) {
  const [open, setOpen] = useState(false);

  const signatureHtml = generateSignature({ 
    ...formData, 
    email: formData.email ? `${formData.email}@acommerce.asia` : '', // Ensure domain is appended
    departments, 
    countries 
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: '10px', System: 2 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Box sx={{ padding: '10px'}}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  const handleCopy = async () => {
  try {
    // Create a temporary DOM element to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = signatureHtml;
    const signatureDiv = tempDiv.querySelector('#signature-container');
    if (!signatureDiv) {
      alert('Signature container not found.');
      return;
    }
    const signatureOnlyHtml = signatureDiv.outerHTML;

    if (navigator.clipboard && window.ClipboardItem) {
      const blob = new Blob([signatureOnlyHtml], { type: 'text/html' });
      const clipboardItem = new window.ClipboardItem({ 'text/html': blob });
      await navigator.clipboard.write([clipboardItem]);
      setOpen(true);
    } else {
      // Fallback for browsers that don't support ClipboardItem
      const listener = (e) => {
        e.preventDefault();
        e.clipboardData.setData('text/html', signatureOnlyHtml);
        e.clipboardData.setData('text/plain', signatureOnlyHtml);
      };
      document.addEventListener('copy', listener);
      document.execCommand('copy');
      document.removeEventListener('copy', listener);
      setOpen(true);
    }
  } catch (err) {
    alert('Copy failed. Please copy manually.');
  }
};

  const handleClose = () => {
    setOpen(false);
  };

  const handleGoToGmail = () => {
    window.location.href = 'https://mail.google.com/mail/u/0/#settings/general';
  };

  return (
    <Box sx={{ width: '45%', padding: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* <Typography variant="h6">Signature Preview</Typography> */}
      <div style={{padding: 10 }} dangerouslySetInnerHTML={{ __html: signatureHtml }} />
      <Button
        variant="contained"
        onClick={handleCopy}
      >
        <ContentCopyOutlinedIcon/>Copy Signature
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Signature Copied!</DialogTitle>
        <DialogContent>
          <Typography>Your signature has been copied to the clipboard.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleGoToGmail} variant="contained" color="primary">
            Go to GMail Setting
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default SignaturePreview;