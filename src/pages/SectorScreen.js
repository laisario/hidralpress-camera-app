import { 
  Dimensions, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View,
} from "react-native"
import { useNavigation, useTheme } from "@react-navigation/native";
import { useData } from "../hooks/useData";


function SectorScreen({ route }) {
  const { os } = route.params;
  const { sectors } = useData();
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  
  const navigation = useNavigation();
  
  const handleClick = (sector) => {
    navigation.navigate('Câmera', { os, sector });
  };

  const handleSector = {
    montagem: { color: colors.primary },
    desmontagem: { color: colors.card },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{os}</Text>
      <View style={styles.sectorsContainer}>
        <Text style={styles.subtitle}>Selecione o setor:</Text>
        {!!sectors?.length && sectors.map((sector) => (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: handleSector[sector.name]?.color }]}
            onPress={() => handleClick(sector.name)}
            key={sector.id}
          >
            <Text style={styles.buttonText}>{sector.name.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View />
    </View>
  );
}

export default SectorScreen;

const windowWidth = Dimensions.get('window').width;

const makeStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
    color: '#757575',
  },
  button: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    textAlign: 'center',
    marginBottom: 16,
    width: windowWidth * 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});