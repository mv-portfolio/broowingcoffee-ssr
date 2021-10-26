import {useEffect, useReducer, useState} from 'react';
import {useParams} from 'react-router';
import {logo} from 'assets/icons';
import {receipt as receiptReducer, receiptInitState} from 'hooks';
import {View, Text, Image, Separator} from 'components';
import {ErrorPage, LoadingPage} from 'pages';
import {server} from 'network/service';
import styles from './.module.css';
import PurchasedItemList from './components/PurchasedItemList';
import Formatter from 'utils/Formatter';
import {getProperties} from 'utils/helper';
import * as details from './details';
import {
  getOrganizedPurchasedProducts,
  onComputePrice,
  onComputeTax,
} from 'utils/strategies';

export default function Receipt() {
  const {token} = useParams();
  const [state, setState] = useReducer(receiptReducer, receiptInitState);

  const products =
    getOrganizedPurchasedProducts(
      ['name', 'discount', 'type', 'price', 'based', 'addons'],
      state.payload.products,
    ) || [];

  const onComputeTotalPrice = (products = [], discount) => {
    let totalPrice = 0;
    products.forEach(product => {
      totalPrice += parseFloat(onComputePrice(true, product));
    });
    return totalPrice - totalPrice * (discount / 100);
  };
  const totalPrice = onComputeTotalPrice(state.payload.products, state.payload.discount);
  const tax = onComputeTax(
    onComputeTotalPrice(state.payload.products, state.payload.discount),
    0,
  );

  const screenInitListener = () => {
    server
      .peek('/transaction-receipt', {
        timeout: 7000,
        headers: {
          'receipt-auth-token': token,
        },
      })
      .then(({res}) => {
        setState({type: 'set', authRequest: 'success', payload: res});
      })
      .catch(err => {
        setState({type: 'set', authRequest: 'failed'});
      });
  };
  useEffect(screenInitListener, []);

  if (state.authRequest === 'success') {
    document.title = 'Broowing Coffee | Receipt';
    return (
      <View style={styles.mainPane}>
        <View style={styles.logoPane}>
          <Image style={styles.logo} source={logo} />
        </View>
        <View style={styles.topPane}>
          <View style={styles.headerPane}>
            <Text style={styles.title}>Your e-Receipt</Text>
            <Separator vertical={0.5} />
            <Text style={styles.subtitle}>
              Thank you for purchasing our products, you may used this receipt for any
              case of issue on your recent transaction
            </Text>
          </View>
        </View>
        <View style={styles.bodyPane}>
          <View style={styles.contentPane}>
            <View style={styles.headerPane}>
              <Text style={styles.text}>{`Item${products.length > 1 ? 's' : ''}`}</Text>
              <Text style={styles.text}>Computed Price</Text>
            </View>
            <Separator vertical={0.5} />
            <PurchasedItemList products={products} />
          </View>
        </View>
        <View style={styles.bottomPane}>
          <View style={styles.contentPane}>
            {details({
              txnId: state.payload._id,
              txnDiscount: `${state.payload.discount}%`,
              dateIssued: Formatter.getDateDifference(state.payload.date_created),
              tax: tax,
              subtotal: Formatter.toMoney(totalPrice),
              total: Formatter.toMoney(totalPrice + tax),
            }).map((detail, index) => {
              const {property, value} = getProperties(detail)[0];
              return (
                <View key={index} style={styles.propertyPane}>
                  <Text style={styles.text}>{property}</Text>
                  <Text style={styles.subtext}>{value}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.footerPane}>
          <View style={styles.horizontalLine} />
          <Image
            style={styles.devLogo}
            source={'https://petatemarvin26.github.io/static/media/my-logo.aba1892c.png'}
          />
        </View>
      </View>
    );
  }

  if (state.authRequest === 'failed') {
    document.title = 'Broowing Coffee | Error';
    return <ErrorPage />;
  }

  return <LoadingPage />;
}
