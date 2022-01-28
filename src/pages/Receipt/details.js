const details = ({
  txnId,
  tinNumber,
  dateIssued,
  issuedBy,
  cashReceived,
  change,
  total,
}) => ({
  'TXN ID': txnId,
  'TIN NUMBER': tinNumber,
  'DATE ISSUED': dateIssued,
  'ISSUED BY': issuedBy,
  'CASH RECEIVED': cashReceived,
  TOTAL: total,
  CHANGE: change,
});

export default details;
