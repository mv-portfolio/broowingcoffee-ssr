import Formatter from './Formatter';
import {getSpecificProperty} from './helper';

const getOrganizedPurchasedProducts = (props, data = []) => {
  let temp_data = data.map(chunk => getSpecificProperty(props, chunk));
  let returned_data = [];
  let copied = 0;

  temp_data.forEach((chunk, index) => {
    const isExist = returned_data.filter(
      ({name, discount, type, price, based, addons}) =>
        name === chunk.name &&
        discount === chunk.discount &&
        type === chunk.type &&
        price === chunk.price &&
        based === chunk.based &&
        addons.length === chunk.addons.length,
    )[0];

    if (!isExist) {
      copied = 1;
      returned_data.push({...chunk, copied});
    } else {
      copied += 1;
      returned_data = returned_data.map(
        ({name, discount, type, price, based, addons, copied: copy}) => {
          if (
            name === chunk.name &&
            discount === chunk.discount &&
            type === chunk.type &&
            price === chunk.price &&
            based === chunk.based &&
            addons.length === chunk.addons.length
          ) {
            return {
              name,
              discount,
              type,
              price,
              based,
              addons,
              copied,
            };
          }
          return {
            name,
            discount,
            type,
            price,
            based,
            addons,
            copied: copy,
          };
        },
      );
    }
  });

  return returned_data;
};

/**
 *
 * @param {double} price total price
 * @param {integer} tax percentage %
 * @returns computed price with tax
 */
const onComputeTax = (price, tax) => {
  const percent = tax / 100;
  return parseFloat((price * percent).toFixed(2));
};

const sumOfPrice = (items = []) => {
  let totalPrice = 0;
  items.map(item => (totalPrice = totalPrice + item.price));
  return totalPrice;
};

const onComputePrice = (isShow, purchasingProductInfo) => {
  let finalPrice = 0;
  const {discount, price, addons, copied} = purchasingProductInfo;
  const addonsTotalPrice = sumOfPrice(addons);
  finalPrice += addonsTotalPrice + price;
  if (discount) {
    finalPrice -= (discount / 100) * finalPrice;
  }
  return Formatter.toMoney(finalPrice * (isShow ? 1 : copied));
};

export {sumOfPrice, onComputeTax, onComputePrice, getOrganizedPurchasedProducts};
