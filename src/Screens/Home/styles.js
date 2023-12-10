import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import {height, moderateScale, moderateScaleVertical, textScale} from '../../styles/responsiveSize';
import fontFamily from '../../styles/fontFamily';

const styles = StyleSheet.create({
  boxStyle: {
    borderRadius: moderateScale(8),
    backgroundColor: colors.grayColor,
    padding:moderateScale(12)
  },
  profileImage:{
    width:moderateScale(60), 
    height:moderateScale(60) ,
    borderRadius:moderateScale(30) ,
    marginRight:moderateScale(16)    
},
dotStyle:{
    height:moderateScale(22),
    width:moderateScale(22),
    tintColor:colors.white
},
nameStyle:{
    fontSize:textScale(16),
    fontFamily:fontFamily.medium,
    color:colors.white
},
bioStyle:{
    fontSize:textScale(12),
    fontFamily:fontFamily.medium,
    color:colors.whiteOpacity50,
    marginTop:moderateScaleVertical(4)
},
postImage:{
    width:'100%', 
    height:height/2.8 ,
    borderRadius:moderateScale(8) ,
    marginRight:moderateScale(16) ,
    marginVertical:moderateScaleVertical(16)   
},
descStyle:{
    fontSize:textScale(14),
    fontFamily:fontFamily.regular,
    
},
flexHorizontal:{
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent:'space-between'
},
noDataFound:{
    fontSize:textScale(24),
    fontFamily:fontFamily.regular,   
},
likeImg:{
    height:moderateScale(16),
    width:moderateScale(16),
    tintColor:colors.white
}
});
 export default styles;