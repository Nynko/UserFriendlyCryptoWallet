import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import {useAnchorProgram} from '../../hooks/contexts/useAnchorProgram';
import {DLT} from '../../types/account';
import {getMinimumRent} from '../../functions/solana/getBalances';
import {
  useMintAddresses,
  useMintBalance,
  useNativeBalance,
} from '../../store/selectors';
import {adjustedBalance} from '../../functions/dlts/DltUtils';
import * as anchor from '@coral-xyz/anchor';
import FastImage from 'react-native-fast-image';
import {YStack} from 'tamagui';

export const HomeBalances = ({
  dlt,
  wrapper,
  mint,
  price,
}: {
  dlt: DLT;
  wrapper: string;
  mint: string;
  price: number;
}) => {
  console.log('Rendering HomeBalances component start');
  // const program = useAnchorProgram().program;
  const mintData = useMintAddresses(dlt, wrapper, mint);
  const balances = useMintBalance(dlt, wrapper, mint);
  const mintBalance = Number(balances.balance) / 10 ** balances.decimals;
  // const nativeBalance = useNativeBalance(dlt);

  // const [rentMinimum, setRentMinimum] = useState<number | null>(null);

  // const adjustedSolBalance = adjustedBalance(
  //   dlt,
  //   Number(nativeBalance) / anchor.web3.LAMPORTS_PER_SOL,
  //   rentMinimum,
  // );

  // useEffect(() => {
  //   if (dlt === DLT.SOLANA) {
  //     const fetchRentMinimum = async () => {
  //       getMinimumRent(0, program.provider.connection).then(setRentMinimum);
  //     };
  //     fetchRentMinimum();
  //   }
  // }, [dlt, program.provider.connection]);

  const total_eur = mintBalance * price || 0;

  console.log('Rendering HomeBalances component');

  return (
    <View style={[{alignItems: 'center'}, styles.top]}>
      <View style={styles.imageContainer}>
        <FastImage
          style={styles.image}
          resizeMode="contain"
          source={require('../../assets/Solde/Solde.png')}
        />
      </View>
      <View style={[styles.container, styles.top]}>
        <YStack gap={10}>
          <Text style={styles.smallTitle}>{'Mon Solde'}</Text>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{`${total_eur.toFixed(2)} € `}</Text>
            <Text
              style={
                styles.subtitles
              }>{`${mintBalance} ${mintData.name}`}</Text>
            {/* <Text
          style={
            typography.subtitleText
          }>{`${adjustedSolBalance} SOL ${'for fees'}`}</Text> */}
          </View>
        </YStack>
      </View>
    </View>
  );
};

const {width, height} = Dimensions.get('window');
const widthRatio = width * 0.01;
const heightRatio = height * 0.01;
const styles = StyleSheet.create({
  top: {
    top: 3 * heightRatio,
  },
  imageContainer: {
    width: 90 * widthRatio,
    height: 30 * heightRatio,
  },
  image: {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  container: {
    position: 'absolute',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 60 * height * 0.001,
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
  },
  subtitles: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 30 * height * 0.001,
    fontWeight: '300',
    fontFamily: 'Montserrat-Regular',
  },
  smallTitle: {
    left: -15 * widthRatio,
    textAlign: 'left',
    color: '#fff',
    fontSize: 22 * height * 0.001,
    fontWeight: '300',
    fontFamily: 'Montserrat-Regular',
    // top: 6 * heightRatio,
    // left: 5 * widthRatio,
  },
});
