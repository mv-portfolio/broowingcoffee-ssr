const details = ({txnId, txnDiscount, dateIssued, tax, subtotal, total}) => {
  return [
    {'TXN ID': txnId},
    {'TXN DISCOUNT': txnDiscount},
    {'DATE ISSUED': dateIssued},
    {TAX: tax},
    {SUBTOTAL: subtotal},
    {TOTAL: total},
  ];
};

module.exports = details;
