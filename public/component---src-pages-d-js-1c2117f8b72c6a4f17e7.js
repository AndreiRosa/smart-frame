(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{kCwQ:function(e,t,c){"use strict";c.r(t);c("a1Th"),c("Btvt"),c("9XZr");var n=c("q1tI"),o=c.n(n),a=c("Zttt"),l=c("6QdR"),r=l.a.firestore();t.default=function(){var e=Math.floor(999999*Math.random()).toString().padStart(6,"0"),t=!!localStorage.getItem("deviceNumber")&&!!localStorage.getItem("owner"),c=localStorage.getItem("deviceNumber")||e,i=Object(n.useState)(!1),u=i[0],d=i[1],s=Object(n.useState)(t),f=s[0],v=s[1];return Object(n.useEffect)((function(){f||r.collection("temp-devices").doc(c).set({lastSeen:l.a.firestore.FieldValue.serverTimestamp()}).then((function(){localStorage.setItem("deviceNumber",c),d(!0)}))}),[f]),Object(n.useEffect)((function(){var e=null;return u&&!f&&(e=r.collection("temp-devices").doc(c).onSnapshot((function(e){var t=e.data();t&&t.owner&&r.collection("devices").doc(t.owner).collection("devices").doc(c).set({activated:!0}).then((function(){localStorage.setItem("owner",t.owner),v(!0),r.collection("devices").doc(t.owner).delete().then((function(){}))}))}))),function(){e&&e()}}),[u,f]),Object(n.useEffect)((function(){var e=null;return f&&(e=r.collection("devices").doc(localStorage.getItem("owner")).collection("devices").doc(localStorage.getItem("deviceNumber")).onSnapshot((function(e){}))),function(){e&&e()}})),o.a.createElement(a.a,null,o.a.createElement("h1",null,"Página Inicial"),!f&&o.a.createElement("h2",null,c),!f&&o.a.createElement("h2",null,"Device already activated!"))}}}]);
//# sourceMappingURL=component---src-pages-d-js-1c2117f8b72c6a4f17e7.js.map