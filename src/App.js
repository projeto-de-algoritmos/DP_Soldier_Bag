import { Box, Button, Flex, Input, ListItem, Select, Text, UnorderedList } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import './App.css';
import { items } from './items.js';
import { knapsack } from './knapsack';

function App() {
  const [itemType, setItemType] = useState('Default');
  const [bagItems, setItems] = useState([...items]);
  const [maxWeight, setMaxWeight] = useState();
  const [bestChoose, setBestChoose] = useState();

  function handleSetItemType(e){
    setItemType(e.target.value);
  }

  useEffect(() => {
    gerarSequencia();
  }, [itemType]);

  const gerarSequencia = () => {

    if(itemType === "Enfermaria"){
      console.log('Entrou')
      setItems(items.filter( i => { return i.cat === 'e'}));
    } else if(itemType === "Alimentacao"){
      setItems(items.filter( i => { return i.cat === 'a'}));
    } else if(itemType === "Higiene"){
      setItems(items.filter( i => { return i.cat === 'h'}));
    } else {
      setItems([...items]);
    }
  }

  return (
    <Flex bg={"#D3D3D3"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} h='calc(100vh)'> 
      <>
        {!bestChoose ? (
          <>
            <Text color={'Green'} fontSize='2xl' fontWeight={'bold'} mb={'10px'}>Categoria:</Text>
            <Select color={'Green'} bg={'white'} h={'50px'} w={'300px'} fontSize='xl' marginBottom={'50px'} onChange={(e) => handleSetItemType(e)} defaultValue="Default">
              <option value="Default">Todos os Itens</option>
              <option value="Enfermaria">Itens de Enfermaria</option>
              <option value="Alimentacao">Alimentação</option>
              <option value="Higiene">Itens de Higiene</option>
            </Select>
            <Flex width='60%' justifyContent={'space-around'}>
              <UnorderedList spacing={[1, 2]} direction={['column', 'row']}>
                {bagItems?.map(item => (
                  <>
                    <ListItem color={'Green'} fontSize='xl'>Item: {item.name} - Peso: {item.weight}</ListItem>
                  </>
                ))}
              </UnorderedList>
                
              <Box bgColor={'Green'} w={'400px'} h={'250px'} border={'1px solid purple'} borderRadius={'10px'}>
                <Text color={'white'} m={'30px'} fontSize='xl' fontWeight={'bold'} mb={'10px'}>
                  Qual é o peso máximo que consegue carregar na batalha?
                </Text>
                <Flex px={'20px'} justifyContent={'space-around'}>
                  <Input
                    bg={'white'} 
                    onChange={e => setMaxWeight(e.target.value)} 
                    h={'50px'} 
                    w={'100px'} 
                    fontSize='xl' 
                    borderColor={'white'}
                    mt={'40px'}
                  />
                  <Button 
                    bg={'white'} 
                    h={'50px'} 
                    w={'150px'} 
                    fontSize='xl'
                    color={'Green'}
                    fontWeight={'bold'}
                    borderColor={'#D3D3D3'}
                    mt={'40px'}
                    verticalAlign={'baseline'}
                    disabled={!maxWeight}
                    onClick={() => {
                      if (maxWeight > 0) {                        
                        const response = knapsack(bagItems, maxWeight);
                        setBestChoose(response);
                      }
                    }}
                  >
                    Confirmar
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </>
        )
        : 
        (
          <Flex w={'100%'} h="60%" flexDirection={'column'} justify="space-around" align={'center'}>
            <Button 
              ml={'100px'} 
              alignSelf={'self-start'} 
              onClick={() => setBestChoose('')}
              bg={'white'} 
              h={'50px'} 
              w={'150px'} 
              fontSize='xl'
              color={'Green'}
              fontWeight={'bold'}
              borderColor={'#D3D3D3'}
            >
              Voltar
            </Button>
            <Text mb={"50px"} color={'Green'} fontSize='4xl' fontWeight={'bold'}>Peso total: {bestChoose.W}</Text>
            <Box>
              <Text mb={"30px"} color={'Green'} fontSize='2xl' fontWeight={'bold'}>Itens escolhidos:</Text>
              <UnorderedList spacing={[1, 2]} direction={['column', 'row']}>
                {bestChoose?.subset?.map(item => (
                  <ListItem>
                    <Box borderTop={'1px solid Green'} paddingX={'30px'} paddingy={'30px'} key={item.name}>
                      <Flex>
                        <Text color={'Green'} fontSize='xl' fontWeight={'bold'}>
                          Item:
                        </Text >
                        <Text color={'Green'} fontSize='xl' fontWeight={'bold'}>
                          &nbsp;{item.name}
                        </Text>
                      </Flex>
                      <Flex>
                        <Text color={'Green'} fontSize='xl' fontWeight={'bold'}>
                          Peso:
                        </Text>
                        <Text color={'Green'} fontSize='xl' fontWeight={'bold'}>
                          &nbsp;{item.weight}
                        </Text>
                      </Flex>
                    </Box>
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>
          </Flex>
        )}
      </>      
    </Flex>
  )
}

export default App;