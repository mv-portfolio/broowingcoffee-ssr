import {useEffect, useReducer} from 'react';
import {useParams} from 'react-router';
import {logo} from 'assets/icons';
import {receipt as receiptReducer, receiptInitState} from 'hooks';
import {View, Text, Image, Separator, Icon} from 'components';
import {ErrorPage, LoadingPage} from 'pages';
import {server} from 'network/service';
import {
  getDefaultObjectProducts,
  getPropsValues,
  onComputePurchasingProducts,
} from 'utils/helper';
import {BG_COLOR} from 'constants/colors';
import {ADDRESS, CONTACT_NUMBER, INSTAGRAM, TIN_NUMBER} from 'constants/strings';
import PurchasingListItem from './components/PurchasingListItem';
import Formatter from 'utils/Formatter';
import {hp} from 'utils/responsive';
import details from './details';
import styles from './.module.css';

export default function Receipt() {
  const {token} = useParams();
  const [state, setState] = useReducer(receiptReducer, receiptInitState);

  // const products =
  //   getOrganizedPurchasedProducts(
  //     ['issued_by', 'discount', 'type', 'price', 'based', 'addons'],
  //     state.payload.products,
  //   ) || [];

  const screenInitListener = () => {
    server
      .peek('/transaction-receipt', {
        timeout: 7000,
        headers: {
          'receipt-auth-token': token,
        },
      })
      .then(({res}) => {
        console.log(res);
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
          <Separator horizontal={1} />
          <View style={styles.logoRightPane}>
            <Text style={styles.textTitle}>BROOWING COFFEE</Text>
            <Separator vertical={0.15} />
            <Text style={styles.text}>{ADDRESS}</Text>
            <Separator vertical={0.15} />
            <View style={styles.contactsPane}>
              <a className={styles.contact} href={INSTAGRAM}>
                <Icon font='AntDesign' name='instagram' color={BG_COLOR} size={hp(3)} />
                <Separator horizontal={0.5} />
                <Text style={styles.contactText}>INSTA</Text>
              </a>
              <Separator horizontal={0.5} />
              <Text>|</Text>
              <Separator horizontal={0.75} />
              <View style={styles.contact}>
                <Icon font='AntDesign' name='phone' color={BG_COLOR} size={hp(2.5)} />
                <Separator horizontal={0.5} />
                <Text style={styles.contactText}>{CONTACT_NUMBER}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.topPane}>
          <View style={styles.headerPane}>
            <Text style={styles.title}>Your e-Receipt</Text>
            <Separator vertical={0.5} />
            <Text style={styles.subtitle}>
              Thank you for purchasing our products, this will be serve as Official
              Receipt, you may use this receipt for any case of issue or concern on your
              recent transaction
            </Text>
          </View>
        </View>
        <View style={styles.bodyPane}>
          <View style={styles.contentPane}>
            <View style={styles.headerPane}>
              <Text style={styles.text}>{`${state.payload.products.length} Item${
                state.payload.products.length > 1 ? 's' : ''
              }`}</Text>
              <Text style={styles.text}>Computed Price</Text>
            </View>
            <Separator vertical={0.5} />
            <PurchasingListItem
              style={styles.purchasedList}
              purchasingProducts={getDefaultObjectProducts(state.payload.products)}
            />
          </View>
        </View>
        <View style={styles.bottomPane}>
          <View style={styles.contentPane}>
            {getPropsValues(
              details({
                txnId: state.payload._id,
                tinNumber: TIN_NUMBER,
                dateIssued: `${new Date(
                  state.payload.date_created,
                ).toLocaleDateString()} - ${new Date(
                  state.payload.date_created,
                ).toLocaleTimeString()}`,
                cashReceived: Formatter.toMoney(state.payload.cash),
                change: Formatter.toMoney(
                  state.payload.cash -
                    onComputePurchasingProducts(state.payload.products),
                ),
                issuedBy: Formatter.toName(state.payload.issued_by),
                total: Formatter.toMoney(
                  onComputePurchasingProducts(state.payload.products),
                ),
              }),
            ).map(({property, value}, index) => {
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
