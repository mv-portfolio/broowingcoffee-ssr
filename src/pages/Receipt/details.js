const details = ({txnId, txnDiscount, dateIssued, issuedBy, total}) => ({
  'TXN ID': txnId,
  'TXN DISCOUNT': txnDiscount,
  'DATE ISSUED': dateIssued,
  'ISSUED BY': issuedBy,
  TOTAL: total,
});

module.exports = details;
