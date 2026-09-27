import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@voen_calc_state_v1';

const TARIFF_RATES = {
  1: 14331, 2: 15761, 3: 17196, 4: 18627, 5: 21494,
  6: 22925, 7: 24359, 8: 25075, 9: 25791, 10: 28656,
  11: 29373, 12: 30091, 13: 30806, 14: 31521, 15: 32239,
  16: 32954, 17: 33671, 18: 34420, 19: 35103, 20: 35819,
  21: 36536, 22: 37251, 23: 37970, 24: 38686, 25: 39400,
  26: 40118, 27: 40835, 28: 41549, 29: 42267, 30: 42983,
  31: 43698, 32: 44416, 33: 45132, 34: 45849, 35: 46566,
  36: 47281, 37: 47998, 38: 48713, 39: 49430, 40: 50146,
  41: 50863, 42: 51579, 43: 52296, 44: 53012, 45: 53727,
  46: 54444, 47: 57308, 48: 60176, 49: 63039, 50: 64474,
};

const RANKS = [
  { name: 'рядовой / матрос', salary: 7166 },
  { name: 'ефрейтор / старший матрос', salary: 7881 },
  { name: 'младший сержант / старшина 2 статьи', salary: 8598 },
  { name: 'сержант / старшина 1 статьи', salary: 9315 },
  { name: 'старший сержант / главный старшина', salary: 10032 },
  { name: 'старшина / главный корабельный старшина', salary: 10750 },
  { name: 'прапорщик / мичман', salary: 11465 },
  { name: 'старший прапорщик / старший мичман', salary: 12181 },
  { name: 'младший лейтенант', salary: 13614 },
  { name: 'лейтенант', salary: 14331 },
  { name: 'старший лейтенант', salary: 15046 },
  { name: 'капитан / капитан-лейтенант', salary: 15761 },
  { name: 'майор / капитан 3 ранга', salary: 16481 },
  { name: 'подполковник / капитан 2 ранга', salary: 17196 },
  { name: 'полковник / капитан 1 ранга', salary: 18630 },
  { name: 'генерал-майор / контр-адмирал', salary: 28656 },
  { name: 'генерал-лейтенант / вице-адмирал', salary: 31521 },
  { name: 'генерал-полковник / адмирал', salary: 35820 },
  { name: 'генерал армии / адмирал флота', salary: 38686 },
];

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  const [period, setPeriod] = useState('оклады на 01.10.2025 г.');
  const [rankIndex, setRankIndex] = useState(1);
  const [tariffRank, setTariffRank] = useState(4);

  const [flightPercent, setFlightPercent] = useState(0);
  const [seniorityPercent, setSeniorityPercent] = useState(40);
  const [secretPercent, setSecretPercent] = useState(10);
  const [specialConditionsPercent, setSpecialConditionsPercent] = useState(50);
  const [qualificationPercent, setQualificationPercent] = useState(20);
  const [districtValue, setDistrictValue] = useState(1.6);
  const [northernPercent, setNorthernPercent] = useState(80);
  const [monthlyBonusPercent, setMonthlyBonusPercent] = useState(25);

  const [contractPercent, setContractPercent] = useState(50);
  const [driverPercent, setDriverPercent] = useState(0);
  const [soldierBonusPercent, setSoldierBonusPercent] = useState(0);
  const [otherAchievement, setOtherAchievement] = useState({
    label: 'за разминирование, за воинск. доблес..',
    percent: 20,
  });

  const [riskDaysInput, setRiskDaysInput] = useState('');
  const [restDaysInput, setRestDaysInput] = useState('');

  const [alimonyPercent, setAlimonyPercent] = useState(0);
  const [zgtItem, setZgtItem] = useState({ label: '', percent: 0 });
  const [cipherItem, setCipherItem] = useState({ label: '', percent: 0 });
  const [hasMatHelp, setHasMatHelp] = useState(false);
  const [isCombatVeteran, setIsCombatVeteran] = useState(false);
  const [childDeduction, setChildDeduction] = useState(0);

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuTitle, setMenuTitle] = useState('');
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const data = JSON.parse(saved);
          if (data.period !== undefined) setPeriod(data.period);
          if (data.rankIndex !== undefined) setRankIndex(data.rankIndex);
          if (data.tariffRank !== undefined) setTariffRank(data.tariffRank);
          if (data.flightPercent !== undefined) setFlightPercent(data.flightPercent);
          if (data.seniorityPercent !== undefined) setSeniorityPercent(data.seniorityPercent);
          if (data.secretPercent !== undefined) setSecretPercent(data.secretPercent);
          if (data.specialConditionsPercent !== undefined) setSpecialConditionsPercent(data.specialConditionsPercent);
          if (data.qualificationPercent !== undefined) setQualificationPercent(data.qualificationPercent);
          if (data.districtValue !== undefined) setDistrictValue(data.districtValue);
          if (data.northernPercent !== undefined) setNorthernPercent(data.northernPercent);
          if (data.monthlyBonusPercent !== undefined) setMonthlyBonusPercent(data.monthlyBonusPercent);
          if (data.contractPercent !== undefined) setContractPercent(data.contractPercent);
          if (data.driverPercent !== undefined) setDriverPercent(data.driverPercent);
          if (data.soldierBonusPercent !== undefined) setSoldierBonusPercent(data.soldierBonusPercent);
          if (data.otherAchievement !== undefined) setOtherAchievement(data.otherAchievement);
          if (data.riskDaysInput !== undefined) setRiskDaysInput(data.riskDaysInput);
          if (data.restDaysInput !== undefined) setRestDaysInput(data.restDaysInput);
          if (data.alimonyPercent !== undefined) setAlimonyPercent(data.alimonyPercent);
          if (data.zgtItem !== undefined) setZgtItem(data.zgtItem);
          if (data.cipherItem !== undefined) setCipherItem(data.cipherItem);
          if (data.hasMatHelp !== undefined) setHasMatHelp(data.hasMatHelp);
          if (data.isCombatVeteran !== undefined) setIsCombatVeteran(data.isCombatVeteran);
          if (data.childDeduction !== undefined) setChildDeduction(data.childDeduction);
        }
      } catch (e) {
        console.log('Error reading storage', e);
      } finally {
        setIsLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    const stateToSave = {
      period,
      rankIndex,
      tariffRank,
      flightPercent,
      seniorityPercent,
      secretPercent,
      specialConditionsPercent,
      qualificationPercent,
      districtValue,
      northernPercent,
      monthlyBonusPercent,
      contractPercent,
      driverPercent,
      soldierBonusPercent,
      otherAchievement,
      riskDaysInput,
      restDaysInput,
      alimonyPercent,
      zgtItem,
      cipherItem,
      hasMatHelp,
      isCombatVeteran,
      childDeduction,
    };
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave)).catch((e) =>
      console.log('Error saving storage', e)
    );
  }, [
    isLoaded,
    period,
    rankIndex,
    tariffRank,
    flightPercent,
    seniorityPercent,
    secretPercent,
    specialConditionsPercent,
    qualificationPercent,
    districtValue,
    northernPercent,
    monthlyBonusPercent,
    contractPercent,
    driverPercent,
    soldierBonusPercent,
    otherAchievement,
    riskDaysInput,
    restDaysInput,
    alimonyPercent,
    zgtItem,
    cipherItem,
    hasMatHelp,
    isCombatVeteran,
    childDeduction,
  ]);

  const ovd = TARIFF_RATES[tariffRank] || 0;
  const ovz = RANKS[rankIndex].salary;
  const ods = ovd + ovz;

  const seniorityRub = (ods * seniorityPercent) / 100;
  const secretRub = (ovd * secretPercent) / 100;
  const specialConditionsRub = (ovd * specialConditionsPercent) / 100;
  const qualRub = (ovd * qualificationPercent) / 100;
  const baseForCoefficients = ods + seniorityRub + secretRub + specialConditionsRub + qualRub;

  const districtRub = districtValue > 1.0 ? baseForCoefficients * (districtValue - 1.0) : 0;
  const northernRub = (baseForCoefficients * northernPercent) / 100;

  const flightRub = (ovd * flightPercent) / 100;
  const monthlyBonusRub = (ods * monthlyBonusPercent) / 100;
  const contractRub = (ovd * contractPercent) / 100;
  const driverRub = (ovd * driverPercent) / 100;
  const soldierRub = (ovd * soldierBonusPercent) / 100;
  const otherAchievementRub = (ovd * otherAchievement.percent) / 100;
  const zgtRub = (ovd * zgtItem.percent) / 100;
  const cipherRub = (ovd * cipherItem.percent) / 100;
  const matHelpRub = hasMatHelp ? ods : 0;

  const rawRiskDays = parseInt(riskDaysInput, 10) || 0;
  const calculatedRiskPercent = Math.min(rawRiskDays * 2, 60);
  const riskRub = (ovd * calculatedRiskPercent) / 100;

  const rawRestDays = parseInt(restDaysInput, 10) || 0;
  const calculatedRestDays = Math.floor(rawRestDays / 3) * 2;
  const restDayRate = ods / 30;
  const restRub = calculatedRestDays * restDayRate;

  const totalGross =
    baseForCoefficients +
    districtRub +
    northernRub +
    flightRub +
    monthlyBonusRub +
    contractRub +
    driverRub +
    soldierRub +
    otherAchievementRub +
    zgtRub +
    cipherRub +
    matHelpRub +
    riskRub +
    restRub;

  let totalDeductions = 0;
  if (isCombatVeteran) totalDeductions += 500;
  totalDeductions += childDeduction;

  const taxable = Math.max(0, totalGross - totalDeductions);
  const ndfl = Number((taxable * 0.13).toFixed(2));
  const afterTax = totalGross - ndfl;
  const alimonyRub = Number(((afterTax * alimonyPercent) / 100).toFixed(2));

  const totalDeducted = ndfl + alimonyRub;
  const totalNet = totalGross - totalDeducted;

  const openMenu = (title, items) => {
    setMenuTitle(title);
    setMenuItems(items);
    setMenuVisible(true);
  };

  const renderField = (title, valueText, onPress) => (
    <View style={styles.block}>
      {title ? <Text style={styles.blockTitle}>{title}</Text> : null}
      <TouchableOpacity style={styles.buttonField} onPress={onPress} activeOpacity={0.75}>
        <Text style={styles.buttonFieldText} numberOfLines={1}>
          {valueText}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#303f9f" />

      <View style={styles.navBar}>
        <Text style={styles.navIcon}>☰</Text>
        <Text style={styles.navTitle} numberOfLines={1}>Денежное довольствие 20...</Text>
        <Text style={styles.navIcon}>⋮</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>Начислено: {totalGross.toFixed(2)} рублей</Text>
          <Text style={styles.summaryText}>Удержано: {totalDeducted.toFixed(2)} рублей</Text>
          <Text style={styles.summaryTextBold}>На руки: {totalNet.toFixed(2)} рублей.</Text>
        </View>

        {renderField('', period, () =>
          openMenu('Период окладов', [
            { text: 'оклады на 01.10.2025 г.', onSelect: () => setPeriod('оклады на 01.10.2025 г.') },
            { text: 'оклады на 01.10.2023 г.', onSelect: () => setPeriod('оклады на 01.10.2023 г.') },
          ])
        )}

        {renderField('Воинское звание:', RANKS[rankIndex].name, () =>
          openMenu(
            'Воинское звание',
            RANKS.map((r, i) => ({
              text: `${r.name} — ${r.salary.toFixed(1)} руб.`,
              onSelect: () => setRankIndex(i),
            }))
          )
        )}

        {renderField('Тарифный разряд:', `${tariffRank} т.р.`, () =>
          openMenu(
            'Тарифный разряд',
            Object.keys(TARIFF_RATES).map((k) => ({
              text: `${k} т.р. — ${TARIFF_RATES[k].toFixed(1)} руб.`,
              onSelect: () => setTariffRank(Number(k)),
            }))
          )
        )}

        {renderField(
          'Надбавка за квалификационную категорию летного состава:',
          flightPercent === 0 ? 'нет' : `${flightPercent} % - ${flightRub.toFixed(1)} руб.`,
          () =>
            openMenu('Летный состав', [
              { text: 'нет', onSelect: () => setFlightPercent(0) },
              { text: `15 % - 3 класс - ${(ovd * 0.15).toFixed(1)} руб.`, onSelect: () => setFlightPercent(15) },
              { text: `20 % - 2 класс - ${(ovd * 0.2).toFixed(1)} руб.`, onSelect: () => setFlightPercent(20) },
              { text: `30 % - 1 класс - ${(ovd * 0.3).toFixed(1)} руб.`, onSelect: () => setFlightPercent(30) },
              { text: `40 % - снайпер - ${(ovd * 0.4).toFixed(1)} руб.`, onSelect: () => setFlightPercent(40) },
            ])
        )}

        {renderField(
          'Выслуга лет:',
          `${seniorityPercent === 40 ? '25 лет и более' : seniorityPercent + '%'} - ${seniorityPercent}% - ${seniorityRub.toFixed(1)} руб.`,
          () =>
            openMenu('Выслуга лет', [
              { text: `до 2 лет — 0% — 0.0 руб.`, onSelect: () => setSeniorityPercent(0) },
              { text: `от 2 до 5 лет — 10% — ${(ods * 0.1).toFixed(1)} руб.`, onSelect: () => setSeniorityPercent(10) },
              { text: `от 5 до 10 лет — 15% — ${(ods * 0.15).toFixed(1)} руб.`, onSelect: () => setSeniorityPercent(15) },
              { text: `от 10 до 15 лет — 20% — ${(ods * 0.2).toFixed(1)} руб.`, onSelect: () => setSeniorityPercent(20) },
              { text: `от 15 до 20 лет — 25% — ${(ods * 0.25).toFixed(1)} руб.`, onSelect: () => setSeniorityPercent(25) },
              { text: `от 20 до 25 лет — 30% — ${(ods * 0.3).toFixed(1)} руб.`, onSelect: () => setSeniorityPercent(30) },
              { text: `25 лет и более — 40% — ${(ods * 0.4).toFixed(1)} руб.`, onSelect: () => setSeniorityPercent(40) },
            ])
        )}

        {renderField(
          'Надбавка за допуск к сведениям, составляющим гос. тайну:',
          `${secretPercent === 10 ? 'секретно' : secretPercent === 20 ? 'сов. секретно' : secretPercent === 25 ? 'особой важности' : 'нет'} - ${secretPercent}% - ${secretRub.toFixed(1)} руб.`,
          () =>
            openMenu('Допуск к гостайне', [
              { text: `нет — 0% — 0.0 руб.`, onSelect: () => setSecretPercent(0) },
              { text: `секретно — 10% — ${(ovd * 0.1).toFixed(1)} руб.`, onSelect: () => setSecretPercent(10) },
              { text: `совершенно секретно — 20% — ${(ovd * 0.2).toFixed(1)} руб.`, onSelect: () => setSecretPercent(20) },
              { text: `особой важности — 25% — ${(ovd * 0.25).toFixed(1)} руб.`, onSelect: () => setSecretPercent(25) },
            ])
        )}

        {renderField(
          'Надбавка за особые условия службы:',
          `${specialConditionsPercent} % - ${specialConditionsRub.toFixed(1)} руб.`,
          () =>
            openMenu(
              'Особые условия службы',
              Array.from({ length: 21 }, (_, i) => i * 5).map((p) => ({
                text: `${p} % - ${(ovd * (p / 100)).toFixed(2)} руб.`,
                onSelect: () => setSpecialConditionsPercent(p),
              }))
            )
        )}

        {renderField(
          'Надбавка за классную квалификацию:',
          qualificationPercent === 0
            ? 'без класса - 0.0 руб.'
            : `${qualificationPercent === 20 ? '1 класс' : qualificationPercent === 10 ? '2 класс' : qualificationPercent === 5 ? '3 класс' : 'Мастер'} - ${qualificationPercent}% - ${qualRub.toFixed(1)} руб.`,
          () =>
            openMenu('Классная квалификация', [
              { text: 'без класса - 0.0 руб.', onSelect: () => setQualificationPercent(0) },
              { text: `3 класс - 5% - ${(ovd * 0.05).toFixed(2)} руб.`, onSelect: () => setQualificationPercent(5) },
              { text: `2 класс - 10% - ${(ovd * 0.1).toFixed(1)} руб.`, onSelect: () => setQualificationPercent(10) },
              { text: `1 класс - 20% - ${(ovd * 0.2).toFixed(1)} руб.`, onSelect: () => setQualificationPercent(20) },
              { text: `Мастер - 30% - ${(ovd * 0.3).toFixed(1)} руб.`, onSelect: () => setQualificationPercent(30) },
            ])
        )}

        {renderField(
          'Районный коэффициент',
          `${districtValue} - ${districtRub.toFixed(1)} руб.`,
          () =>
            openMenu('Районный коэффициент', [
              { text: `1.0 — 0.0 руб.`, onSelect: () => setDistrictValue(1.0) },
              { text: `1.15 — ${(baseForCoefficients * 0.15).toFixed(2)} руб.`, onSelect: () => setDistrictValue(1.15) },
              { text: `1.2 — ${(baseForCoefficients * 0.2).toFixed(2)} руб.`, onSelect: () => setDistrictValue(1.2) },
              { text: `1.3 — ${(baseForCoefficients * 0.3).toFixed(2)} руб.`, onSelect: () => setDistrictValue(1.3) },
              { text: `1.4 — ${(baseForCoefficients * 0.4).toFixed(2)} руб.`, onSelect: () => setDistrictValue(1.4) },
              { text: `1.5 — ${(baseForCoefficients * 0.5).toFixed(2)} руб.`, onSelect: () => setDistrictValue(1.5) },
              { text: `1.6 — ${(baseForCoefficients * 0.6).toFixed(2)} руб.`, onSelect: () => setDistrictValue(1.6) },
              { text: `1.7 — ${(baseForCoefficients * 0.7).toFixed(2)} руб.`, onSelect: () => setDistrictValue(1.7) },
              { text: `1.8 — ${(baseForCoefficients * 0.8).toFixed(2)} руб.`, onSelect: () => setDistrictValue(1.8) },
              { text: `2.0 — ${(baseForCoefficients * 1.0).toFixed(2)} руб.`, onSelect: () => setDistrictValue(2.0) },
            ])
        )}

        {renderField(
          'Северная надбавка:',
          `${northernPercent} % - ${northernPercent === 80 ? 'II группа территорий' : northernPercent === 50 ? 'III группа территорий' : northernPercent === 30 ? 'IV группа территорий' : northernPercent === 100 ? 'I группа территорий' : ''} - ${northernRub.toFixed(1)} руб.`,
          () =>
            openMenu(
              'Северная надбавка',
              [
                { text: '0 % - 0.0 руб.', p: 0 },
                { text: `10 % - ${(baseForCoefficients * 0.1).toFixed(2)} руб.`, p: 10 },
                { text: `20 % - ${(baseForCoefficients * 0.2).toFixed(2)} руб.`, p: 20 },
                { text: `30 % - IV группа территорий - ${(baseForCoefficients * 0.3).toFixed(2)} руб.`, p: 30 },
                { text: `40 % - ${(baseForCoefficients * 0.4).toFixed(2)} руб.`, p: 40 },
                { text: `50 % - III группа территорий - ${(baseForCoefficients * 0.5).toFixed(2)} руб.`, p: 50 },
                { text: `60 % - ${(baseForCoefficients * 0.6).toFixed(2)} руб.`, p: 60 },
                { text: `70 % - ${(baseForCoefficients * 0.7).toFixed(2)} руб.`, p: 70 },
                { text: `80 % - II группа территорий - ${(baseForCoefficients * 0.8).toFixed(2)} руб.`, p: 80 },
                { text: `90 % - ${(baseForCoefficients * 0.9).toFixed(2)} руб.`, p: 90 },
                { text: `100 % - I группа территорий - ${(baseForCoefficients * 1.0).toFixed(2)} руб.`, p: 100 },
              ].map((item) => ({
                text: item.text,
                onSelect: () => setNorthernPercent(item.p),
              }))
            )
        )}

        {renderField(
          'Ежемесячная премия:',
          `${monthlyBonusPercent} % - ${monthlyBonusRub.toFixed(1)} руб.`,
          () =>
            openMenu(
              'Ежемесячная премия',
              [
                { p: 25, label: `25 % - ${(ods * 0.25).toFixed(2)} руб.` },
                { p: 20, label: `20 % - ${(ods * 0.2).toFixed(2)} руб.` },
                { p: 15, label: `15 % - ${(ods * 0.15).toFixed(2)} руб.` },
                { p: 10, label: `10 % - ${(ods * 0.1).toFixed(2)} руб.` },
                { p: 5, label: `5 % - ${(ods * 0.05).toFixed(2)} руб.` },
                { p: 1, label: `1 % - ${(ods * 0.01).toFixed(2)} руб.` },
                { p: 0, label: '0 % - 0.0 руб.' },
              ].map((item) => ({
                text: item.label,
                onSelect: () => setMonthlyBonusPercent(item.p),
              }))
            )
        )}

        <Text style={[styles.sectionHeader, { marginTop: 6 }]}>Надбавка за особые достижения:</Text>

        {renderField(
          '- контракт (1-4 т.р.):',
          `${contractPercent} % - 1-4 тарифный разряд - ${contractRub.toFixed(1)} руб.`,
          () =>
            openMenu('Контракт (1-4 т.р.)', [
              { text: `0 % - 0.0 руб.`, onSelect: () => setContractPercent(0) },
              { text: `50 % - 1-4 тарифный разряд - ${(ovd * 0.5).toFixed(1)} руб.`, onSelect: () => setContractPercent(50) },
            ])
        )}

        {renderField(
          '- водители:',
          driverPercent === 0
            ? '0 % - 0.0 руб.'
            : `${driverPercent} % - на должности водителя - ${driverRub.toFixed(1)} руб.`,
          () =>
            openMenu('Водители', [
              { text: '0 % - 0.0 руб.', onSelect: () => setDriverPercent(0) },
              { text: `30 % - на должности водителя - ${(ovd * 0.3).toFixed(1)} руб.`, onSelect: () => setDriverPercent(30) },
            ])
        )}

        {renderField(
          '- 01.07.2020 г.:',
          soldierBonusPercent === 0
            ? '0 % - 0.0 руб.'
            : soldierBonusPercent === 100
            ? `100 % - на должности офицера - ${soldierRub.toFixed(1)} руб.`
            : soldierBonusPercent === 110
            ? `110 % - на должности прапорщика - ${soldierRub.toFixed(1)} руб.`
            : `120 % - на должности сержанта, солдата - ${soldierRub.toFixed(1)} руб.`,
          () =>
            openMenu('- 01.07.2020 г.', [
              { text: '0 % - 0.0 руб.', onSelect: () => setSoldierBonusPercent(0) },
              { text: `100 % - на должности офицера - ${(ovd * 1.0).toFixed(1)} руб.`, onSelect: () => setSoldierBonusPercent(100) },
              { text: `110 % - на должности прапорщика - ${(ovd * 1.1).toFixed(1)} руб.`, onSelect: () => setSoldierBonusPercent(110) },
              { text: `120 % - на должности сержанта, солдата - ${(ovd * 1.2).toFixed(1)} руб.`, onSelect: () => setSoldierBonusPercent(120) },
            ])
        )}

        {renderField(
          '- прочие достижения:',
          otherAchievement.percent === 0
            ? '0 % - 0.0 руб.'
            : `${otherAchievement.percent} % - ${otherAchievement.label} - ${otherAchievementRub.toFixed(1)} руб.`,
          () =>
            openMenu('Прочие достижения', [
              { text: `20 % - за разминирование, за воинск. доблесть I.. - ${(ovd * 0.2).toFixed(1)} руб.`, p: 20, l: 'за разминирование, за воинск. доблес..' },
              { text: `30 % - 1 уровень физо, за боевые отличия - ${(ovd * 0.3).toFixed(1)} руб.`, p: 30, l: '1 уровень физо, за боевые отличия' },
              { text: `40 % - доцент - ${(ovd * 0.4).toFixed(1)} руб.`, p: 40, l: 'доцент' },
              { text: `50 % - контракт на 1-4 т.р. - ${(ovd * 0.5).toFixed(1)} руб.`, p: 50, l: 'контракт на 1-4 т.р.' },
              { text: `60 % - профессор - ${(ovd * 0.6).toFixed(1)} руб.`, p: 60, l: 'профессор' },
              { text: `70 % - высший уровень физо - ${(ovd * 0.7).toFixed(1)} руб.`, p: 70, l: 'высший уровень физо' },
              { text: `80 % - 1 разряд по ВПВС - ${(ovd * 0.8).toFixed(1)} руб.`, p: 80, l: '1 разряд по ВПВС' },
              { text: `90 % - КМС по ВПВС - ${(ovd * 0.9).toFixed(1)} руб.`, p: 90, l: 'КМС по ВПВС' },
              { text: `100 % - МС по ВПВС - ${(ovd * 1.0).toFixed(1)} руб.`, p: 100, l: 'МС по ВПВС' },
              { text: `120 % - контракт + ВУ физо - ${(ovd * 1.2).toFixed(1)} руб.`, p: 120, l: 'контракт + ВУ физо' },
              { text: '0 % - 0.0 руб.', p: 0, l: '' },
            ].map((item) => ({
              text: item.text,
              onSelect: () => setOtherAchievement({ label: item.l, percent: item.p }),
            })))
        )}

        <View style={styles.block}>
          <Text style={styles.blockTitle}>Риск для жизни (приказ 844) (дней):</Text>
          <View style={styles.inputContainerRow}>
            <TextInput
              style={styles.numericInput}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#9ca3af"
              value={riskDaysInput}
              onChangeText={setRiskDaysInput}
            />
            <View style={styles.inputResultBadge}>
              <Text style={styles.inputResultText} numberOfLines={1}>
                {calculatedRiskPercent} % — {riskRub.toFixed(1)} руб.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.block}>
          <Text style={styles.blockTitle}>Сутки отдыха (дней):</Text>
          <View style={styles.inputContainerRow}>
            <TextInput
              style={styles.numericInput}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#9ca3af"
              value={restDaysInput}
              onChangeText={setRestDaysInput}
            />
            <View style={styles.inputResultBadge}>
              <Text style={styles.inputResultText} numberOfLines={1}>
                {calculatedRestDays} сут. — {restRub.toFixed(1)} руб.
              </Text>
            </View>
          </View>
        </View>

        {renderField('Алименты:', `${alimonyPercent} %`, () =>
          openMenu('Алименты', [
            { text: '0 %', onSelect: () => setAlimonyPercent(0) },
            { text: '16.5 %', onSelect: () => setAlimonyPercent(16.5) },
            { text: '25 %', onSelect: () => setAlimonyPercent(25) },
            { text: '33 %', onSelect: () => setAlimonyPercent(33) },
            { text: '50 %', onSelect: () => setAlimonyPercent(50) },
          ])
        )}

        {renderField(
          'Надбавка за работу в структурных подразделениях по ЗГТ:',
          zgtItem.percent === 0 ? '0 % - 0.0 руб.' : `${zgtItem.percent} % - ${zgtItem.label} - ${zgtRub.toFixed(1)} руб.`,
          () =>
            openMenu('Подразделения ЗГТ', [
              { text: '0 % - 0.0 руб.', p: 0, l: '' },
              { text: `10 % - от 1 до 5 лет - ${(ovd * 0.1).toFixed(1)} руб.`, p: 10, l: 'от 1 до 5 лет' },
              { text: `15 % - от 5 до 10 лет - ${(ovd * 0.15).toFixed(2)} руб.`, p: 15, l: 'от 5 до 10 лет' },
              { text: `20 % - от от 10 лет и выше - ${(ovd * 0.2).toFixed(1)} руб.`, p: 20, l: 'от от 10 лет и выше' },
            ].map((item) => ({
              text: item.text,
              onSelect: () => setZgtItem({ label: item.l, percent: item.p }),
            })))
        )}

        {renderField(
          'Надбавка за работу с шифрами:',
          cipherItem.percent === 0 ? '0 % - 0.0 руб.' : `${cipherItem.percent} % - ${cipherItem.label} - ${cipherRub.toFixed(1)} руб.`,
          () =>
            openMenu('Работа с шифрами', [
              { text: '0 % - 0.0 руб.', p: 0, l: '' },
              { text: `5% - до 3 лет (2 класс) - ${(ovd * 0.05).toFixed(2)} руб.`, p: 5, l: 'до 3 лет (2 класс)' },
              { text: `15% - до 3 лет (1 класс) - ${(ovd * 0.15).toFixed(2)} руб.`, p: 15, l: 'до 3 лет (1 класс)' },
              { text: `10% - от 3 до 6 лет (2 класс) - ${(ovd * 0.1).toFixed(1)} руб.`, p: 10, l: 'от 3 до 6 лет (2 класс)' },
              { text: `20% - от 3 до 6 лет (1 класс) - ${(ovd * 0.2).toFixed(1)} руб.`, p: 20, l: 'от 3 до 6 лет (1 класс)' },
              { text: `20% - от 6 и более (2 класс) - ${(ovd * 0.2).toFixed(1)} руб.`, p: 20, l: 'от 6 и более (2 класс)' },
              { text: `30% - от 6 и более (1 класс) - ${(ovd * 0.3).toFixed(1)} руб.`, p: 30, l: 'от 6 и более (1 класс)' },
            ].map((item) => ({
              text: item.text,
              onSelect: () => setCipherItem({ label: item.l, percent: item.p }),
            })))
        )}

        <View style={styles.block}>
          <TouchableOpacity
            style={styles.buttonField}
            onPress={() => setHasMatHelp(!hasMatHelp)}
            activeOpacity={0.8}
          >
            <View style={styles.checkboxContainer}>
              <View style={[styles.checkboxSquare, hasMatHelp && styles.checkboxSquareChecked]}>
                {hasMatHelp && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.buttonFieldText}>
                Материальная помощь: {ods.toFixed(1)} рублей
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionHeader, { marginTop: 10 }]}>Налоговые вычеты:</Text>
        <Text style={styles.subHint}>(необходимо подать заявление в ЕРЦ МО РФ)</Text>

        <View style={styles.block}>
          <TouchableOpacity
            style={[styles.buttonField, { minHeight: 46 }]}
            onPress={() => setIsCombatVeteran(!isCombatVeteran)}
            activeOpacity={0.8}
          >
            <View style={styles.checkboxContainer}>
              <View style={[styles.checkboxSquare, isCombatVeteran && styles.checkboxSquareChecked]}>
                {isCombatVeteran && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <View>
                <Text style={styles.buttonFieldText}>Ветеран боевых действий</Text>
                <Text style={styles.subTextSmall}>(ст.218 п.1. пп.2 - 500 рублей)</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {renderField(
          'Налоговый вычет на несовершеннолетних детей\n(ст. 218 п.1 пп. 4)',
          childDeduction === 0 ? 'нет несовершеннолетних детей' : `Вычет: ${childDeduction} руб.`,
          () =>
            openMenu('Вычет на детей', [
              { text: 'нет несовершеннолетних детей', onSelect: () => setChildDeduction(0) },
              { text: '1 ребенок — 1 400 руб.', onSelect: () => setChildDeduction(1400) },
              { text: '2 ребенка — 2 800 руб.', onSelect: () => setChildDeduction(2800) },
              { text: '3 ребенка — 5 800 руб.', onSelect: () => setChildDeduction(5800) },
              { text: 'ребенок-инвалид — 12 000 руб.', onSelect: () => setChildDeduction(12000) },
            ])
        )}

        <Text style={styles.footerBrand}>
          Калькулятор денежного довольствия военнослужащих{'\n'}AF mobile 2025
        </Text>
      </ScrollView>

      <TouchableOpacity style={styles.fab} activeOpacity={0.85}>
        <Text style={styles.fabIcon}>✉</Text>
      </TouchableOpacity>

      <Modal visible={menuVisible} transparent={true} animationType="fade">
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.popupOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.popupCard}>
                <Text style={styles.popupTitle}>{menuTitle}</Text>
                <FlatList
                  data={menuItems}
                  keyExtractor={(_, i) => i.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.popupItem}
                      onPress={() => {
                        item.onSelect();
                        setMenuVisible(false);
                      }}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.popupItemText}>{item.text}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  navBar: {
    height: 52,
    backgroundColor: '#3b4e9f',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  navIcon: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  navTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginHorizontal: 16,
  },
  scroll: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 90,
  },
  summaryContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  summaryText: {
    fontSize: 15,
    color: '#1f2937',
    fontWeight: '500',
    lineHeight: 22,
  },
  summaryTextBold: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '700',
    lineHeight: 24,
  },
  block: {
    marginBottom: 8,
  },
  blockTitle: {
    fontSize: 13,
    color: '#4b5563',
    fontWeight: '500',
    marginBottom: 3,
  },
  sectionHeader: {
    fontSize: 13,
    color: '#4b5563',
    fontWeight: '600',
    marginBottom: 2,
  },
  subHint: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 6,
  },
  buttonField: {
    minHeight: 38,
    backgroundColor: '#dde3ee',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 7,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  buttonFieldText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
  },
  inputContainerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numericInput: {
    flex: 0.35,
    height: 38,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 7,
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#000000',
    fontWeight: '600',
    textAlign: 'center',
  },
  inputResultBadge: {
    flex: 0.65,
    height: 38,
    backgroundColor: '#dde3ee',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 7,
    marginLeft: 8,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  inputResultText: {
    fontSize: 13,
    color: '#000000',
    fontWeight: '500',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxSquare: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#374151',
    borderRadius: 3,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  checkboxSquareChecked: {
    backgroundColor: '#3b4e9f',
    borderColor: '#3b4e9f',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  subTextSmall: {
    fontSize: 11,
    color: '#374151',
  },
  footerBrand: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 20,
    marginBottom: 20,
  },
  fab: {
    position: 'absolute',
    right: 18,
    bottom: 22,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#f43f5e',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
  },
  fabIcon: {
    color: '#ffffff',
    fontSize: 26,
  },
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  popupCard: {
    width: '100%',
    maxHeight: '75%',
    backgroundColor: '#ffffff',
    borderRadius: 6,
    paddingVertical: 12,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  popupTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1e293b',
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  popupItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f1f5f9',
  },
  popupItemText: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '500',
  },
});
