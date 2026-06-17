import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { LEGAL_URLS } from '../constants/data';

export default function PaywallModal() {
  const { setPurchased, setShowPaywall, startTrial, trialStart, trialActive } = useApp();

  const buy = () => { setPurchased(true); setShowPaywall(false); };

  return (
    <View style={s.overlay}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <Text style={s.emoji}>🌙</Text>
        <Text style={s.title}>Unlock the Portal</Text>
        <Text style={s.sub}>AI dream analysis, bedtime stories, and all premium features</Text>

        {/* Annual */}
        <TouchableOpacity style={s.planFeatured} onPress={buy}>
          <View style={s.badge}><Text style={s.badgeText}>BEST VALUE</Text></View>
          <Text style={s.planLabel}>🌙 Annual — Save 50%</Text>
          <Text style={s.planPrice}>$29.99<Text style={s.planPer}>/year</Text></Text>
          <Text style={s.planNote}>7-day free trial, then $29.99/year. Auto-renews.</Text>
        </TouchableOpacity>

        {/* Monthly */}
        <TouchableOpacity style={s.plan} onPress={buy}>
          <View style={s.planRow}>
            <Text style={s.planSmLabel}>Monthly</Text>
            <Text style={s.planSmPrice}>$3.99<Text style={s.planPer}>/mo</Text></Text>
          </View>
          <Text style={s.planNote}>7-day free trial, then $3.99/month. Auto-renews.</Text>
        </TouchableOpacity>

        {/* Lifetime */}
        <TouchableOpacity style={s.planLifetime} onPress={buy}>
          <View style={s.badgeLife}><Text style={s.badgeText}>FOREVER</Text></View>
          <View style={s.planRow}>
            <Text style={s.planSmLabel}>Lifetime — Pay once</Text>
            <Text style={s.planSmPrice}>$39.99</Text>
          </View>
          <Text style={s.planNote}>One-time purchase. All features, forever. No subscription.</Text>
        </TouchableOpacity>

        {/* Trial CTA */}
        {!trialStart && (
          <TouchableOpacity style={s.trialBtn} onPress={() => { startTrial(); setShowPaywall(false); }}>
            <Text style={s.trialText}>Start Your 7-Day Free Trial</Text>
          </TouchableOpacity>
        )}
        {trialStart && !trialActive && (
          <Text style={s.expired}>Your free trial has ended. Choose a plan to continue.</Text>
        )}

        <Text style={s.terms}>
          Payment is charged to your Apple ID account at confirmation. Subscriptions auto-renew unless turned off 24 hours before period end. Lifetime is a one-time charge.
        </Text>
        <Text style={s.free}>Free to download · Journaling, moon phases, tarot, and dictionary always free</Text>

        <View style={s.links}>
          <TouchableOpacity onPress={() => Linking.openURL(LEGAL_URLS.terms)}>
            <Text style={s.link}>Terms of Use</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(LEGAL_URLS.privacy)}>
            <Text style={s.link}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => Linking.openURL(LEGAL_URLS.manageSub)}>
          <Text style={s.link}>Manage Subscription</Text>
        </TouchableOpacity>

        <TouchableOpacity style={s.closeBtn} onPress={() => setShowPaywall(false)}>
          <Text style={s.closeText}>Continue with free features</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  overlay:{position:'absolute',top:0,left:0,right:0,bottom:0,backgroundColor:'rgba(10,10,26,0.95)',zIndex:9999,justifyContent:'center'},
  content:{alignItems:'center',padding:24,paddingTop:60},
  emoji:{fontSize:40,marginBottom:12},
  title:{fontSize:26,fontWeight:'700',color:'#EAF6FF',marginBottom:4,textAlign:'center'},
  sub:{fontSize:14,color:'rgba(224,216,240,0.5)',marginBottom:20,textAlign:'center'},
  planFeatured:{width:'100%',padding:14,borderRadius:18,backgroundColor:'rgba(255,179,71,0.06)',borderWidth:1.5,borderColor:'rgba(255,179,71,0.2)',marginBottom:10,position:'relative'},
  plan:{width:'100%',padding:12,borderRadius:18,backgroundColor:'rgba(255,255,255,0.03)',borderWidth:1,borderColor:'rgba(255,255,255,0.08)',marginBottom:10},
  planLifetime:{width:'100%',padding:12,borderRadius:18,backgroundColor:'rgba(79,203,255,0.04)',borderWidth:1,borderColor:'rgba(79,203,255,0.15)',marginBottom:14,position:'relative'},
  badge:{position:'absolute',top:-8,right:12,backgroundColor:'#2ecc71',paddingHorizontal:10,paddingVertical:2,borderRadius:99},
  badgeLife:{position:'absolute',top:-8,left:12,backgroundColor:'#4FCBFF',paddingHorizontal:10,paddingVertical:2,borderRadius:99},
  badgeText:{fontSize:11,fontWeight:'800',color:'white'},
  planLabel:{fontSize:14,fontWeight:'700',color:'#ffb347'},
  planPrice:{fontSize:24,fontWeight:'700',color:'#EAF6FF'},
  planPer:{fontSize:13,color:'rgba(224,216,240,0.4)'},
  planNote:{fontSize:13,color:'rgba(224,216,240,0.3)',marginTop:4},
  planRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},
  planSmLabel:{fontSize:14,color:'rgba(224,216,240,0.5)'},
  planSmPrice:{fontSize:18,fontWeight:'700',color:'#EAF6FF'},
  trialBtn:{width:'100%',padding:16,borderRadius:18,backgroundColor:'#4FCBFF',alignItems:'center',marginBottom:14,shadowColor:'#4FCBFF',shadowOffset:{width:0,height:8},shadowOpacity:0.3,shadowRadius:24},
  trialText:{fontSize:15,fontWeight:'700',color:'white'},
  expired:{fontSize:13,color:'#ff6b6b',marginBottom:10,textAlign:'center'},
  terms:{fontSize:11,color:'rgba(224,216,240,0.25)',lineHeight:16,marginBottom:10,textAlign:'center'},
  free:{fontSize:13,color:'rgba(224,216,240,0.2)',marginBottom:10,textAlign:'center'},
  links:{flexDirection:'row',gap:12,marginBottom:6},
  link:{fontSize:13,color:'rgba(79,203,255,0.5)',textDecorationLine:'underline'},
  closeBtn:{padding:8,marginTop:8},
  closeText:{fontSize:13,color:'rgba(224,216,240,0.3)'},
});
