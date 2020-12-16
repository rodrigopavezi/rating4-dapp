import React, { useState } from 'react';
import Web3 from 'web3';
import { ratingAbi } from '../../../abi/abis';
import { Box, Form, FormField, TextInput, Button, RadioButtonGroup, Heading, Text } from 'grommet';

type RateForm = {
    userAddress: string; 
    rate: number;
}

const web3 = new Web3(Web3.givenProvider);
const contractAddr = '0x54138275bf042C8f73B1B512924b6E5CC74B20d6';
// @ts-ignore
const RatingContract = new web3.eth.Contract(ratingAbi, contractAddr);

const RateUser = () => {
    const [setRateValues, setSetRateValues] = useState<RateForm>({ userAddress: '', rate: 0});

    const onSubmitSetRate = async () => {
        // @ts-ignore
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        const gas = await RatingContract.methods.rateUser(setRateValues.userAddress, setRateValues.rate).estimateGas();
        await RatingContract.methods.rateUser(setRateValues.userAddress, setRateValues.rate).send({ from: account, gas });
        setSetRateValues({ userAddress: '', rate: 0})
    }

    return <>
        <Heading level="4">Rate a user by address</Heading>
            <Form
                value={setRateValues}
                onChange={(nextValues) => setSetRateValues(nextValues as RateForm )}
                onReset={() => setSetRateValues({userAddress: '', rate: 0})}
                onSubmit={onSubmitSetRate}
                >
                <FormField name="userAddress" htmlFor="text-input-id" label="User Address" required>
                    <TextInput id="text-input-id" name="userAddress" />
                </FormField>
                <FormField name="rate" htmlFor="text-input-id" label="Rate" required>
                    <RadioButtonGroup direction="row"
                        name="rate"
                        options={[1, 2, 3, 5]}
                        />
                </FormField>
                <Box direction="row" gap="medium">
                    <Button type="submit" primary label="Submit" />
                    <Button type="reset" label="Reset" />
                </Box>
            </Form>
    </>
}

type MyRateForm = {
    userAddress: string;
}
const MyRate = () => {
    const [getMyRateValues, setGetMyRateValues] = useState<MyRateForm>({userAddress: ''});
    const [getMyRate, setGetMyRate] = useState(0);


    const onSubmitGetMyRate = async () => {
        const result = await RatingContract.methods.getMyRateFromUser(getMyRateValues.userAddress).call();
        setGetMyRate(result);
        setGetMyRateValues({userAddress: ''});
      }

    return <>
        <Heading level="4">Get my rate from a rater user address</Heading>
            <Form
                value={getMyRateValues}
                onChange={(nextValues) => setGetMyRateValues(nextValues as MyRateForm)}
                onReset={() => setGetMyRateValues({userAddress: ''})}
                onSubmit={onSubmitGetMyRate}
                >
                <FormField name="userAddress" htmlFor="text-input-id" label="User Address" required>
                    <TextInput id="text-input-id" name="userAddress" />
                </FormField>
                <Box direction="row" gap="medium">
                    <Button type="submit" primary label="Submit" />
                    <Button type="reset" label="Reset" />
                </Box>
                <FormField name="getMyRate" htmlFor="text-input-id" label="Rate">
                    <Text id="text-input-id">{getMyRate}</Text>
                </FormField>
            </Form>
    </>
}

type UserRateForm = {
    ratedUserAddress: string;
    raterUserAddress: string;
}
const UserRate = () => {
    const [userRateValues, setUserRateValues] = useState<UserRateForm>({ratedUserAddress: '', raterUserAddress: ''});
    const [getUserRate, setUserRate] = useState(0);


    const onSubmitGetMyRate = async () => {
        const result = await RatingContract.methods.getUserRateFromUser(userRateValues.ratedUserAddress, userRateValues.raterUserAddress).call();
        setUserRate(result);
        setUserRateValues({ratedUserAddress: '', raterUserAddress: ''});
      }

    return <>
        <Heading level="4">Get the rate given by a rater user to a rated user</Heading>
            <Form
                value={userRateValues}
                onChange={(nextValues) => setUserRateValues(nextValues as UserRateForm)}
                onReset={() => setUserRateValues({ratedUserAddress: '', raterUserAddress: ''})}
                onSubmit={onSubmitGetMyRate}
                >
                <FormField name="ratedUserAddress" htmlFor="text-input-id" label="Rated user address" required>
                    <TextInput id="text-input-id" name="ratedUserAddress" />
                </FormField>
                <FormField name="raterUserAddress" htmlFor="text-input-id" label="Rater user address" required>
                    <TextInput id="text-input-id" name="raterUserAddress" />
                </FormField>
                <Box direction="row" gap="medium">
                    <Button type="submit" primary label="Submit" />
                    <Button type="reset" label="Reset" />
                </Box>
                <FormField name="getUserRate" htmlFor="text-input-id" label="Rate">
                    <Text id="text-input-id">{getUserRate}</Text>
                </FormField>
            </Form>
    </>
}



const Home = () => {

  const handleEnableEthereum = () => {
    // @ts-ignore
    ethereum.request({ method: 'eth_requestAccounts' })
  }

  return (
    <Box>
        <Box direction="row">
            <Button label="Enable Ethereum" onClick={handleEnableEthereum} />
        </Box>
        <Box>
            <Box direction="row" gap="large" justify="around">
                <Box>
                    <RateUser />
                </Box> 
                <Box>
                    <MyRate />
                </Box>
                <Box>
                    <UserRate />
                </Box>
            </Box>
        </Box>
    </Box>
    
  );
}

export default Home;
