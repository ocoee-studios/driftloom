import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking, ActivityIndicator, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { LEGAL_URLS } from '../constants/data';
import { getOfferings, purchasePackage, restorePurchases } from '../services/purchases';

// Display fallbacks shown only while StoreKit prices load / if RC is unconfigured.
const FALLBACK = { annual: '$29.99', monthly: '$3.99', lifetime: '$39.99' };

export default function PaywallModal() {
  const { setPurchased, setShowPaywall } = useApp();
  const [packages, setPackages] = useState(null); // null=loading, {} or {annual,monthly,lifetime}
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      const offering = await getOfferings();
      if (!alive) return;
      if (offering?.availablePackages?.length) {
        const find = (type) => offering.availablePackages.find((p) => p.packageType === type) || null;
        setPackages({ annual: find('ANNUAL'), monthly: find('MONTHLY'), lifetime: find('LIFETIME') });
      } else {
        setPackages({}); // RC unconfigured → purchases disabled (fail closed)
      }
    })();
    return () => { alive = false; };
  }, []);

  const price = (key) => packages?.[key]?.product?.priceString || FALLBACK[key];

  const buy = async (key) => {
    const pkg = packages?.[key];
    if (!pkg || busy) return;
    setBusy(true);
    const ok = await purchasePackage(pkg);
    setBusy(false);
    if (ok) { setPurchased(true); setShowPaywall(false); }
  };

  const restore = async () => {
    if (busy) return;
    setBusy(true);
    const ok = await restorePurchases();
    setBusy(false);
    if (ok) { setPurchased(true); setShowPaywall(false); }
  };

  const ready = packages !== null;
  const configured = ready && (packages.annual || packages.monthly || packages.lifetime);
  const lock = busy || !configured;

  return (
    <View style={s.overlay}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <Text style={s.emoji}>🌙</Text>
        <Text style={s.title}>Unlock the Portal</Text>
        <Text style={s.sub}>Advanced insights, symbol evolution, custom themes, export & backup</Text>

        {/* Annual */}
        <TouchableOpacity style={s.planFeatured} onPress={() => buy('annual')} disabled={lock} activeOpacity={0.85}>
          <View style={s.badge}><Text style={s.badgeText}>BEST VALUE</Text></View>
          <Text style={s.planLabel}>🌙 Annual — 7-day free trial</Text>
          <Text style={s.planPrice}>{price('annual')}<Text style={s.planPer}>/year</Text></Text>
          <Text style={s.planNote}>7-day free trial, then {price('annual')}/year. Auto-renews.</Text>
        </TouchableOpacity>

        {/* Monthly */}
        <TouchableOpacity style={s.plan} onPress={() => buy('monthly')} disabled={lock} activeOpacity={0.85}>
          <View style={s.planRow}>
            <Text style={s.planSmLabel}>Monthly</Text>
            <Text style={s.planSmPrice}>{price('monthly')}<Text style={s.planPer}>/mo</Text></Text>
          </View>
          <Text style={s.planNote}>{price('monthly')}/month. Auto-renews.</Text>
        </TouchableOpacity>

        {/* Lifetime */}
        <TouchableOpacity style={s.planLifetime} onPress={() => buy('lifetime')} disabled={lock} activeOpacity={0.85}>
          <View style={s.badgeLife}><Text style={s.badgeText}>FOREVER</Text></View>
          <View style={s.planRow}>
            <Text style={s.planSmLabel}>Lifetime — Pay once</Text>
            <Text style={s.planSmPrice}>{price('lifetime')}</Text>
          </View>
          <Text style={s.planNote}>One-time purchase. All features, forever. No subscription.</Text>
        </TouchableOpacity>

        {busy && <ActivityIndicator color="#4FCBFF" style={{ marginVertical: 8 }} />}
        {ready && !configured && (
          <Text style={s.expired}>Subscriptions are temporarily unavailable. Please try again later.</Text>
        )}

        <TouchableOpacity onPress={restore} disabled={busy} style={{ marginBottom: 8 }}>
          <Text style={s.restore}>Restore Purchases</Text>
        </TouchableOpacity>

        <Text style={s.terms}>
          Payment is charged to your Apple ID account at confirmation. Subscriptions auto-renew unless turned off 24 hours before period end. Lifetime is a one-time charge.
        </Text>
        <Text style={s.free}>Free to download · Journaling, moon phases, and dictionary always free</Text>

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
  expired:{fontSize:13,color:'#ff6b6b',marginBottom:10,textAlign:'center'},
  restore:{fontSize:14,color:'#4FCBFF',fontWeight:'700',textDecorationLine:'underline'},
  terms:{fontSize:11,color:'rgba(224,216,240,0.25)',lineHeight:16,marginBottom:10,textAlign:'center'},
  free:{fontSize:13,color:'rgba(224,216,240,0.2)',marginBottom:10,textAlign:'center'},
  links:{flexDirection:'row',gap:12,marginBottom:6},
  link:{fontSize:13,color:'rgba(79,203,255,0.5)',textDecorationLine:'underline'},
  closeBtn:{padding:8,marginTop:8},
  closeText:{fontSize:13,color:'rgba(224,216,240,0.3)'},
});
