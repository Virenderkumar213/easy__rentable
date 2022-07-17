// import MaterialCommunityIconsI from 'react-native-vector-icons/MaterialCommunityIcons'
// import SimpleLineIconsI from 'react-native-vector-icons/SimpleLineIcons'
// import MaterialIconsI from 'react-native-vector-icons/MaterialIcons'
// import FontAwesomeI from 'react-native-vector-icons/FontAwesome'
// import FoundationI from 'react-native-vector-icons/Foundation'
// import EvilIconsI from 'react-native-vector-icons/EvilIcons'
// import OcticonsI from 'react-native-vector-icons/Octicons'
// import IoniconsI from 'react-native-vector-icons/Ionicons'
// import FeatherI from 'react-native-vector-icons/Feather'
// import EntypoI from 'react-native-vector-icons/Entypo'
// import ZocialI from 'react-native-vector-icons/Zocial'
// import React from 'react'

// export const MaterialCommunityIcons = props => (
//     <MaterialCommunityIconsI {...props} />
// )
//  const SimpleLineIcons = props => <SimpleLineIconsI {...props} />
//  const MaterialIcons = props => <MaterialIconsI {...props} />
//  const FontAwesome = props => <FontAwesomeI {...props} />
//  const Foundation = props => <FoundationI {...props} />
//  const EvilIcons = props => <EvilIconsI {...props} />
//  const Ionicons = props => <IoniconsI {...props} />
//  const Octicons = props => <OcticonsI {...props} />
//  const Feather = props => <FeatherI {...props} />
//  const Entypo = props => <EntypoI {...props} />
//  const Zocial = props => <ZocialI {...props} />

// export default  {
//     MaterialCommunityIcons,
//     SimpleLineIcons,
//     SimpleLineIcons,
//     MaterialIcons,
//     FontAwesome,
//     Foundation,
//     EvilIcons,
//     Ionicons,
//     Octicons,
//     Feather,
//     Entypo,
//     Zocial 
// }

import AntDesign from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import FAIcon5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OcticonIcon from 'react-native-vector-icons/Octicons';
import React from 'react';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import ZocialIcon from 'react-native-vector-icons/Zocial';

const getIcon = type => {
  switch (type) {
    case 'fontisto':
      return Fontisto;
    case 'material':
      return MaterialIcons;
    case 'evil':
      return EvilIcon;
    case 'feather':
      return Feather;
    case 'ant':
      return AntDesign;
    case 'simpleLine':
      return SimpleLineIcon;
    case 'zocial':
      return ZocialIcon;
    case 'simpleLine':
      return SimpleLineIcon;
    case 'foundation':
      return FoundationIcon;
    case 'fa5':
      return FAIcon5;
    case 'fa':
      return FAIcon;
    case 'ionicon':
      return Ionicon;
    case 'materialCommunity':
      return MaterialCommunityIcon;
    case 'entypo':
      return EntypoIcon;
    case 'octicon':
      return OcticonIcon;
    default:
      return FAIcon;
  }
};

const Icon = ({
  type,
  ...props
}) => {
  const FontIcon = getIcon(type);

  return <FontIcon { ...props
  }
  />;
};

export default Icon;