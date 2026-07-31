/* THE LEDGER — data register for the edition "An American household, 1900-2025".
 *
 * SCHEMA v1. This file is the single source of every displayed value on
 * ledger/american-household.html. The engine (ledger/engine/ledger.js) holds no
 * data and no edition assumptions: era count, line set, currency labels, the
 * wage spine and the texture picks all come from here.
 *
 * LAW (CHARTER-LEDGER.md):
 *   - every displayed value carries {value, unit, source edition, series/table,
 *     population, vintage, retrieval date} by way of its `src` key into
 *     `sources` below, plus a per-cell `year` where the value's year differs
 *     from the era’s;
 *   - prose on the page repeats no digit this register does not hold;
 *   - the static no-JS tables in the page carry data-ledger-cell attributes and
 *     are audited against this register at run time (see engine `audit()`);
 *   - hours-prices are NOT stored. They are computed by the engine as
 *     nominal price / nominal hourly earnings, both taken from this register,
 *     so no derived digit is ever hand-entered.
 *
 * Segment 1 covers eras 1900, 1915, 1929-33, 1944, 1955, 1965.
 * Every value below was read this session at the primary named in `sources`.
 */
(function () {
  "use strict";

  var W = window.LEDGER = window.LEDGER || {};
  W.registers = W.registers || {};

  /* ---------------------------------------------------------------- sources */

  var sources = {
    "hsus-d769": {
      issuer: "U.S. Bureau of the Census",
      work: "Historical Statistics of the United States, Colonial Times to 1970 (Bicentennial Edition), Part 1",
      series: "Series D 765-778, column D 769 - average weekly hours, “payroll” manufacturing industries",
      population: "wage earners in manufacturing industries covered by employer payroll reports; compiled by Paul H. Douglas, Real Wages in the United States, 1890-1926 (1930)",
      caveat: "For 1890-1913 the underlying data cover selected occupations only and exclude most laborers; the Census note reads: “Therefore, for 1890-1913, the series are extrapolations backward from the 1914 level.”",
      vintage: "1975 edition",
      retrieved: "2026-07-30"
    },
    "hsus-d770": {
      issuer: "U.S. Bureau of the Census",
      work: "Historical Statistics of the United States, Colonial Times to 1970 (Bicentennial Edition), Part 1",
      series: "Series D 765-778, column D 770 - average hourly earnings, “payroll” manufacturing industries",
      population: "wage earners in manufacturing industries covered by employer payroll reports; compiled by Paul H. Douglas, Real Wages in the United States, 1890-1926 (1930)",
      caveat: "An average, never a median. For 1890-1913 the series is, in the Census note’s words, an extrapolation backward from the 1914 level. The same note warns that the all-manufacturing TOTAL (column D 766: 21.6 cents in 1900) is “too high” because union scales are over-weighted in it, and that it may be desirable to use the payroll columns alone to represent all manufacturing.",
      vintage: "1975 edition",
      retrieved: "2026-07-30"
    },
    "hsus-d802": {
      issuer: "U.S. Bureau of the Census / Bureau of Labor Statistics",
      work: "Historical Statistics of the United States, Colonial Times to 1970 (Bicentennial Edition), Part 1",
      series: "Series D 802-810, column D 802 - average hourly earnings, production workers, all manufacturing, 1909-1970",
      population: "production workers on the payrolls of reporting manufacturing establishments; an average, not a median. From 1932 the payroll concept is gross pay before deductions, including overtime, shift premiums, sick leave, holidays, vacations and production bonuses, and excluding payments in kind, retroactive pay, non-production bonuses and employer contributions to welfare, insurance and pension plans.",
      caveat: "For 1909-1931 the Census note reads: “It is likely that the hourly earnings figures are overstated and the weekly hours understated because the BLS surveys of wages tended to sample large firms more heavily than small firms.”",
      vintage: "1975 edition",
      retrieved: "2026-07-30"
    },
    "hsus-d803": {
      issuer: "U.S. Bureau of the Census / Bureau of Labor Statistics",
      work: "Historical Statistics of the United States, Colonial Times to 1970 (Bicentennial Edition), Part 1",
      series: "Series D 802-810, column D 803 - average weekly hours, production workers, all manufacturing, 1909-1970",
      population: "production workers on the payrolls of reporting manufacturing establishments. From 1932 the figure counts hours PAID, which include hours paid for vacations, holidays, sick leave, travel time and lunch time.",
      caveat: "For 1909-1931 the Census note holds that weekly hours are understated (large-firm sampling).",
      vintage: "1975 edition",
      retrieved: "2026-07-30"
    },
    "hsus-d804": {
      issuer: "U.S. Bureau of the Census / Bureau of Labor Statistics",
      work: "Historical Statistics of the United States, Colonial Times to 1970 (Bicentennial Edition), Part 1",
      series: "Series D 802-810, column D 804 - average weekly earnings, production workers, all manufacturing",
      population: "production workers on the payrolls of reporting manufacturing establishments",
      vintage: "1975 edition",
      retrieved: "2026-07-30"
    },
    "hsus-d740": {
      issuer: "U.S. Bureau of the Census",
      work: "Historical Statistics of the United States, Colonial Times to 1970 (Bicentennial Edition), Part 1",
      series: "Series D 739-764, column D 740 - average annual earnings per full-time employee, manufacturing, 1900-1970, in current dollars",
      population: "full-time employees in manufacturing. This is earnings per WORKER, not the income of a household.",
      vintage: "1975 edition",
      retrieved: "2026-07-30"
    },
    "hsus-d86": {
      issuer: "U.S. Bureau of the Census",
      work: "Historical Statistics of the United States, Colonial Times to 1970 (Bicentennial Edition), Part 1",
      series: "Series D 85-86, column D 86 - unemployment as a percent of the civilian labor force, 1890-1970",
      population: "persons 16 years old and over, except that prior to 1947 the figures are for persons 14 years old and over; annual averages. The interwar rates are reconstructions, not a contemporary count: no agency collected labor-force data before the 1940s, and the 1929-33 figures here are Stanley Lebergott’s.",
      vintage: "1975 edition",
      retrieved: "2026-07-30"
    },
    "hsus-d36": {
      issuer: "U.S. Bureau of the Census",
      work: "Historical Statistics of the United States, Colonial Times to 1970 (Bicentennial Edition), Part 1",
      series: "Series D 29-41, column D 36 - female labor force participation rate",
      population: "women 16 years old and over, except that prior to 1947 the basis is women 14 years old and over. Decennial-census rows are census-date counts; other rows are annual averages of monthly figures.",
      vintage: "1975 edition",
      retrieved: "2026-07-30"
    },
    "hsus-d182": {
      issuer: "U.S. Bureau of the Census",
      work: "Historical Statistics of the United States, Colonial Times to 1970 (Bicentennial Edition), Part 1",
      series: "Series D 182-232 - major occupation group of the experienced civilian labor force, by sex",
      population: "persons 14 years old and over in the experienced civilian labor force; census data for 1900 as of June 1, 1910 April 15, 1920 January 1, and 1930-1970 April 1. Shares shown are computed from two rows of this same table.",
      vintage: "1975 edition",
      retrieved: "2026-07-30"
    },
    "hsus-n240": {
      issuer: "U.S. Bureau of the Census",
      work: "Historical Statistics of the United States, Colonial Times to 1970 (Bicentennial Edition), Part 2",
      series: "Series N 238-245, column N 240 - persons per occupied housing unit, 1890-1970",
      population: "all occupied housing units at the census date. This is persons per occupied unit, which is not the same construct as the Bureau’s later “average population per household” series (that table prints 3.67 for 1940 where this one prints 3.8).",
      vintage: "1975 edition",
      retrieved: "2026-07-30"
    },
    "hsus-n243": {
      issuer: "U.S. Bureau of the Census",
      work: "Historical Statistics of the United States, Colonial Times to 1970 (Bicentennial Edition), Part 2",
      series: "Series N 238-245, column N 243 - owner-occupied homes as a percent of occupied units reporting tenure, 1890-1970",
      population: "occupied housing units reporting tenure at the census date. The Bureau's later historical-housing compilation prints 46.5 for 1900 on its own construct where this table prints 46.7; the two are different denominators, not a correction.",
      vintage: "1975 edition",
      retrieved: "2026-07-30"
    },
    "hsus-e187": {
      issuer: "U.S. Bureau of Labor Statistics, via the U.S. Bureau of the Census",
      work: "Historical Statistics of the United States, Colonial Times to 1970 (Bicentennial Edition), Part 1",
      series: "Series E 187-202 - retail prices of selected foods in U.S. cities (BLS), 1890-1970, in cents per unit indicated",
      population: "priced in industrial localities in 30 to 40 States up to 1952; from 1953 in the 46 cities of the Consumer Price Index; from 1964 in 50 areas. The national averages for 1890-1915 are BLS estimates made from price relatives rather than direct national averages.",
      vintage: "1975 edition",
      retrieved: "2026-07-30"
    },
    "hsus-s108": {
      issuer: "U.S. Bureau of the Census",
      work: "Historical Statistics of the United States, Colonial Times to 1970 (Bicentennial Edition), Part 2",
      series: "Series S 108-119, column S 108 - annual residential use per customer, kilowatt-hours, 1902-1970",
      population: "residential customers of electric utilities. The table’s own footnote: beginning 1950, figures were revised to allocate rural service to other classes of service and are “not comparable with previous years.”",
      vintage: "1975 edition",
      retrieved: "2026-07-30"
    },
    "hsus-s109": {
      issuer: "U.S. Bureau of the Census",
      work: "Historical Statistics of the United States, Colonial Times to 1970 (Bicentennial Edition), Part 2",
      series: "Series S 108-119, columns S 109-111 - percentage of dwelling units with electric service, all dwellings / farm / urban and rural nonfarm, 1902-1970",
      population: "dwelling units with electric service. The table carries values for 1902, 1907, 1912, 1917 and 1920 and then annually, so years between those early points have no figure and none is interpolated here.",
      vintage: "1975 edition",
      retrieved: "2026-07-30"
    },
    "hsus-s116": {
      issuer: "U.S. Bureau of the Census",
      work: "Historical Statistics of the United States, Colonial Times to 1970 (Bicentennial Edition), Part 2",
      series: "Series S 108-119, column S 116 - average residential price of electric energy, all consumption, cents per kilowatt-hour",
      population: "residential service of electric utilities; the 1950 revision noted at S 108 applies to this column too.",
      vintage: "1975 edition",
      retrieved: "2026-07-30"
    },
    "hsus-q153": {
      issuer: "U.S. Bureau of the Census",
      work: "Historical Statistics of the United States, Colonial Times to 1970 (Bicentennial Edition), Part 2",
      series: "Series Q 148-162, column Q 153 - automobile registrations, thousands, 1900-1970",
      population: "motor cars registered with the States. A registration count is not a count of households owning a car: one household may register several, and firms register cars too.",
      vintage: "1975 edition",
      retrieved: "2026-07-30"
    },
    "census-f5": {
      issuer: "U.S. Census Bureau",
      work: "Historical Income Tables: Families, Table F-5, Race and Hispanic Origin of Householder - Families by Median and Mean Income: 1947 to 2024 (all races)",
      series: "median and mean money income of families, in current dollars",
      population: "families as of March of the following year; money income is pre-tax cash income and excludes capital gains and non-cash benefits. A FAMILY is two or more related people living together, which is not the same universe as a HOUSEHOLD.",
      vintage: "released with the 2025 CPS ASEC",
      retrieved: "2026-07-30"
    },
    "census-ms2": {
      issuer: "U.S. Census Bureau",
      work: "Table MS-2, Estimated Median Age at First Marriage, by Sex: 1890 to Present",
      series: "estimated median age at first marriage",
      population: "decennial censuses for 1890-1940, Current Population Survey thereafter; the Bureau labels the whole series ESTIMATED. There are no figures between the census years before 1947.",
      vintage: "Internet release December 2025",
      retrieved: "2026-07-30"
    }
  };

  /* ------------------------------------------------------------- wage spine */

  var wage = {
    label: "one hour of a manufacturing production worker’s pay",
    unitNote: "average hourly earnings, an average and never a median",
    values: {
      "1900": { v: 0.152, src: "hsus-d770" },
      "1915": { v: 0.212, src: "hsus-d770" },
      "1929": { v: 0.56, src: "hsus-d802" },
      "1933": { v: 0.44, src: "hsus-d802" },
      "1944": { v: 1.01, src: "hsus-d802" },
      "1955": { v: 1.86, src: "hsus-d802" },
      "1965": { v: 2.61, src: "hsus-d802" }
    },
    splices: [
      "1900 and 1915 are taken from Douglas’s payroll-manufacturing series as the Census reprints it (D 770); 1929 onward from the Bureau of Labor Statistics production-worker series (D 802).",
      "The two lineages overlap: at 1909 D 770 reads 17.9 cents and D 802 reads 19 cents; at 1914 D 770 reads 21.3 cents and D 802 reads 22 cents. They are close, but they are not the same measurement, and no value here is carried across the join."
    ]
  };

  /* ------------------------------------------------------------------ lines */

  var lines = [
    { id: "occupation", label: "What the earner does", group: "core" },
    { id: "hours", label: "Hours in the working week", group: "core" },
    { id: "earnings", label: "A year’s earnings", group: "core" },
    { id: "income", label: "A family’s income", group: "core" },
    { id: "home", label: "The home", group: "core" },
    { id: "household", label: "Who is in it, who earns", group: "core" },
    { id: "transport", label: "Getting about", group: "core" },
    { id: "basket", label: "The basket", group: "core", priced: true },
    { id: "unemployment", label: "Out of work", group: "texture", domain: "Risk and security" },
    { id: "electric", label: "Electric light", group: "texture", domain: "The home's systems" },
    { id: "power", label: "Electricity used", group: "texture", domain: "The home's systems" },
    { id: "service", label: "In service", group: "texture", domain: "Boarders, servants, and the household economy" },
    { id: "farmcity", label: "Farm and city", group: "texture", domain: "Geography and the commute" }
  ];

  /* ------------------------------------------------------------------ eras */

  function cell(display, src, extra) {
    var o = { display: display, src: src };
    if (extra) { for (var k in extra) { if (extra.hasOwnProperty(k)) { o[k] = extra[k]; } } }
    return o;
  }

  var eras = [
    /* ------------------------------------------------------------ 1900 ---- */
    {
      id: "1900",
      label: "1900",
      title: "The century's gate",
      columns: [{ key: "a", label: "1900" }],
      construct: "Occupations and households: decennial census, persons 14 and over (occupations) and occupied housing units (the home). Wages and hours: Douglas’s payroll-manufacturing series, an average, and before 1914 an extrapolation backward. Food: BLS retail prices in industrial localities, estimated from price relatives before 1915. Eras are chosen at documented breaks in the record, and every value is dated to the year the source prints, never to the year of the panel.",
      texture: [
        { lineId: "unemployment", reason: "the era’s own record of insecurity, from the same table that carries the 1933 figure, so the two can be read against each other" },
        { lineId: "service", reason: "the household as an employer of other households: this is the construct strip made flesh" },
        { lineId: "farmcity", reason: "in 1900 the tenure gap between farm and city is the housing story, and a single national ownership rate hides it" },
        { lineId: "electric", reason: "the arrival date of the invisible infrastructure, shown at the first year the series prints" }
      ],
      cells: {
        occupation: { a: cell("Farm work, 10,888 of 29,030 thousand, 37.5%", "hsus-d182", { year: 1900, note: "The census counts farmers and farm managers (5,763 thousand) apart from farm laborers and foremen (5,125); farmers and farm managers were the largest single major occupation group. Operatives, the largest group outside farming, numbered 3,720 thousand. Share computed from the table’s own rows." }) },
        hours: { a: cell("62.1 hours", "hsus-d769", { year: 1900, note: "Average weekly hours, payroll manufacturing industries. The widely quoted 59 hours is the same table's all-manufacturing total (D 765), which weights union scales in." }) },
        earnings: { a: cell("$487 a year", "hsus-d740", { year: 1900, note: "Average annual earnings per full-time employee in manufacturing. Per worker, not per household." }) },
        income: { a: cell("not measured", null, { absent: true,  note: "No survey measured the income of American families in 1900. The first Census median is for 1947." }) },
        home: { a: cell("46.7% owned", "hsus-n243", { year: 1900, note: "Owner-occupied as a percent of occupied units reporting tenure." }) },
        household: { a: cell("4.8 people; 20.0% of women in the labor force", "hsus-n240", { year: 1900, note: "Persons per occupied housing unit (N 240). The women's figure is the participation rate at the June 1900 census on a 14-and-over basis (D 36). Median age at first marriage: 25.9 for men, 21.9 for women (MS-2)." }) },
        transport: { a: cell("8 thousand motor cars registered", "hsus-q153", { year: 1900, note: "In the whole country." }) },
        basket: {
          a: {
            items: [
              { label: "a dozen eggs", price: 0.209, unit: "dozen", src: "hsus-e187", year: 1900 },
              { label: "half a gallon of milk, delivered", price: 0.136, unit: "half gallon", src: "hsus-e187", year: 1900 },
              { label: "a pound of butter", price: 0.261, unit: "pound", src: "hsus-e187", year: 1900 },
              { label: "a pound of round steak", price: 0.132, unit: "pound", src: "hsus-e187", year: 1900 },
              { label: "a pound of bread", price: null, unit: "pound", src: "hsus-e187", note: "The bread series begins in 1913; the Bureau computed no national average before then." }
            ]
          }
        },
        unemployment: { a: cell("5.0%", "hsus-d86", { year: 1900, note: "Percent of the civilian labor force, 14 and over on this basis." }) },
        electric: { a: cell("8.0% of dwellings, 1907", "hsus-s109", { year: 1907, note: "The series begins at 1902 with no figure and prints 1907 next; nothing is interpolated back to 1900." }) },
        power: { a: cell("not measured", null, { absent: true,  note: "No residential use per customer is printed for 1900 or 1907." }) },
        service: { a: cell("1,526 of 5,319 thousand women at work, 28.7%", "hsus-d182", { year: 1900, note: "Private household workers were the largest single occupation line among women in the experienced civilian labor force. Share computed from the table’s own two rows." }) },
        farmcity: { a: cell("Farm 64.4% owned, nonfarm 36.5%", "hsus-n243", { year: 1900, note: "The farm household owned; the city household rented." }) }
      }
    },

    /* ------------------------------------------------------------ 1915 ---- */
    {
      id: "1915",
      label: "1915",
      title: "The industrial wage household",
      columns: [{ key: "a", label: "1915" }],
      construct: "Wages, hours and food are annual figures for 1915. Households, occupations and tenure are decennial, so the nearest census years are shown with their dates: there is no 1915 household size, no 1915 tenure rate and no 1915 median age at first marriage, and none is interpolated here.",
      texture: [
        { lineId: "unemployment", reason: "1915 is the decade's worst year in this series, which cuts against reading the pre-war industrial wage as a settled prosperity" },
        { lineId: "electric", reason: "the light arrives in the cities first, and the series' own 1912 reading dates it" },
        { lineId: "farmcity", reason: "the two censuses that bracket 1915 show the tenure gap holding" }
      ],
      cells: {
        occupation: { a: cell("Farm work, 11,533 of 37,291 thousand in 1910, 30.9%", "hsus-d182", { year: 1910, note: "By the January 1920 census, 11,390 of 42,206 thousand, 27.0%. Farmers and farm managers (6,163 thousand in 1910) were still the largest single major occupation group. Shares computed from the table’s own rows." }) },
        hours: { a: cell("58.2 hours", "hsus-d769", { year: 1915, note: "Average weekly hours, payroll manufacturing industries." }) },
        earnings: { a: cell("$661 a year", "hsus-d740", { year: 1915, note: "Average annual earnings per full-time employee in manufacturing." }) },
        income: { a: cell("not measured", null, { absent: true,  note: "No measurement of family income exists for 1915." }) },
        home: { a: cell("45.9% owned in 1910, 45.6% in 1920", "hsus-n243", { year: 1910, note: "No tenure figure exists for 1915. The rate had been falling slowly since 1890." }) },
        household: { a: cell("4.5 people in 1910, 4.3 in 1920", "hsus-n240", { year: 1910, note: "Persons per occupied housing unit at the two bracketing censuses. Women's labor force participation is not printed for 1910 in this series; at the January 1920 census it was 22.7% on a 14-and-over basis." }) },
        transport: { a: cell("2,332 thousand motor cars registered", "hsus-q153", { year: 1915, note: "Up from 8 thousand in 1900." }) },
        basket: {
          a: {
            items: [
              { label: "a dozen eggs", price: 0.341, unit: "dozen", src: "hsus-e187", year: 1915 },
              { label: "half a gallon of milk, delivered", price: 0.178, unit: "half gallon", src: "hsus-e187", year: 1915 },
              { label: "a pound of butter", price: 0.358, unit: "pound", src: "hsus-e187", year: 1915 },
              { label: "a pound of round steak", price: 0.230, unit: "pound", src: "hsus-e187", year: 1915 },
              { label: "a pound of bread", price: 0.070, unit: "pound", src: "hsus-e187", year: 1915 }
            ]
          }
        },
        unemployment: { a: cell("8.5%", "hsus-d86", { year: 1915, note: "The highest reading between 1900 and 1920 in this series." }) },
        electric: { a: cell("15.9% of dwellings, 1912", "hsus-s109", { year: 1912, note: "The series prints 1912 and then 1917 (24.3%); there is no 1915 figure." }) },
        power: { a: cell("264 kilowatt-hours a year, 1912", "hsus-s108", { year: 1912, note: "Per residential customer." }) },
        service: { a: cell("not measured", null, { absent: true,  note: "Occupation counts are decennial; the 1910 and 1920 columns are shown at the 1900 and 1929 panels." }) },
        farmcity: { a: cell("Farm 62.8% owned, nonfarm 38.4% in 1910", "hsus-n243", { year: 1910 }) }
      }
    },

    /* --------------------------------------------------------- 1929-33 ---- */
    {
      id: "1929",
      label: "1929 → 1933",
      title: "The same ledger at boom and at bust",
      columns: [{ key: "a", label: "1929" }, { key: "b", label: "1933" }],
      construct: "One household, two years, the same sources in both columns. The unemployment rates for these years are reconstructions rather than a contemporary count, and the ones shown are Stanley Lebergott’s as the Census prints them; other scholars who count relief workers as employed rather than unemployed put the 1933 figure lower. The hourly earnings and weekly hours for 1929 carry the Census’s own warning that, before 1932, earnings are likely overstated and hours understated.",
      texture: [
        { lineId: "unemployment", reason: "the panel exists for this line; it is the one number the two columns are read for" },
        { lineId: "electric", reason: "the light stayed on: a documented counter-current inside the collapse" },
        { lineId: "power", reason: "use per customer rose through the slump, which the ownership share alone would not show" }
      ],
      cells: {
        occupation: {
          a: cell("Farm work, 10,321 of 48,686 thousand in 1930, 21.2%", "hsus-d182", { year: 1930, note: "Operatives were now the largest single major occupation group, at 7,691 thousand; the two farm groups together were larger still. Shares computed from the table’s own rows." }),
          b: cell("not measured", null, { absent: true,  note: "Occupations are counted only at the census; the next one is 1940, by which time operatives had passed farmworkers." })
        },
        hours: {
          a: cell("44.2 hours", "hsus-d803", { year: 1929 }),
          b: cell("38.1 hours", "hsus-d803", { year: 1933 })
        },
        earnings: {
          a: cell("$1,543 a year; 56 cents an hour", "hsus-d740", { year: 1929, note: "Annual earnings per full-time employee in manufacturing (D 740); hourly earnings of production workers (D 802). Weekly earnings were $24.76 (D 804)." }),
          b: cell("$1,086 a year; 44 cents an hour", "hsus-d740", { year: 1933, note: "Weekly earnings were $16.65 (D 804)." })
        },
        income: {
          a: cell("not measured", null, { absent: true,  note: "No measurement of family income exists for either year." }),
          b: cell("not measured", null, { absent: true,  note: "No measurement of family income exists for either year." })
        },
        home: {
          a: cell("47.8% owned in 1930", "hsus-n243", { year: 1930, note: "The highest reading since 1890." }),
          b: cell("43.6% owned in 1940", "hsus-n243", { year: 1940, note: "By the next census the rate had fallen below every reading back to 1890." })
        },
        household: {
          a: cell("4.1 people in 1930; 23.6% of women in the labor force", "hsus-n240", { year: 1930, note: "Persons per occupied housing unit; women's participation at the April 1930 census, 14 and over. Median age at first marriage in 1930: 24.3 for men, 21.3 for women." }),
          b: cell("3.8 people in 1940; 25.8% of women in the labor force", "hsus-n240", { year: 1940, note: "Both at the April 1940 census." })
        },
        transport: {
          a: cell("23,121 thousand motor cars registered", "hsus-q153", { year: 1929 }),
          b: cell("20,657 thousand motor cars registered", "hsus-q153", { year: 1933, note: "Registrations fell for four straight years and did not pass the 1929 figure again until 1936." })
        },
        basket: {
          a: {
            items: [
              { label: "a dozen eggs", price: 0.527, unit: "dozen", src: "hsus-e187", year: 1929 },
              { label: "half a gallon of milk, delivered", price: 0.288, unit: "half gallon", src: "hsus-e187", year: 1929 },
              { label: "a pound of butter", price: 0.555, unit: "pound", src: "hsus-e187", year: 1929 },
              { label: "a pound of round steak", price: 0.460, unit: "pound", src: "hsus-e187", year: 1929 },
              { label: "a pound of bread", price: 0.088, unit: "pound", src: "hsus-e187", year: 1929 }
            ]
          },
          b: {
            items: [
              { label: "a dozen eggs", price: 0.288, unit: "dozen", src: "hsus-e187", year: 1933 },
              { label: "half a gallon of milk, delivered", price: 0.214, unit: "half gallon", src: "hsus-e187", year: 1933 },
              { label: "a pound of butter", price: 0.278, unit: "pound", src: "hsus-e187", year: 1933 },
              { label: "a pound of round steak", price: 0.257, unit: "pound", src: "hsus-e187", year: 1933 },
              { label: "a pound of bread", price: 0.071, unit: "pound", src: "hsus-e187", year: 1933 }
            ]
          }
        },
        unemployment: {
          a: cell("3.2%", "hsus-d86", { year: 1929 }),
          b: cell("24.9%", "hsus-d86", { year: 1933, note: "Lebergott’s reconstruction as the Census prints it: 12,830 thousand people out of work. The intervening years read 8.7, 15.9 and 23.6 percent." })
        },
        electric: {
          a: cell("67.9% of dwellings; farm 9.2%", "hsus-s109", { year: 1929 }),
          b: cell("66.7% of dwellings; farm 11.8%", "hsus-s109", { year: 1933, note: "The national share slipped by about a point over the slump while the farm share kept climbing." })
        },
        power: {
          a: cell("502 kilowatt-hours a year", "hsus-s108", { year: 1929, note: "Per residential customer; the price was 6.33 cents a kilowatt-hour." }),
          b: cell("600 kilowatt-hours a year", "hsus-s108", { year: 1933, note: "Use per customer rose every year of the slump; the price fell to 5.52 cents." })
        },
        service: { a: cell("not measured", null, { absent: true,  note: "Not shown for this panel." }), b: cell("not measured", null, { absent: true,  note: "Not shown for this panel." }) },
        farmcity: { a: cell("not measured", null, { absent: true,  note: "Not shown for this panel." }), b: cell("not measured", null, { absent: true,  note: "Not shown for this panel." }) }
      }
    },

    /* ------------------------------------------------------------ 1944 ---- */
    {
      id: "1944",
      label: "1944",
      title: "The war household",
      columns: [{ key: "a", label: "1944" }],
      construct: "Wartime figures on peacetime constructs. Wages, hours and food prices are annual 1944 values; the price figures are the measured retail averages, and measured prices under wartime controls were disputed at the time. Households and tenure are decennial: the nearest readings are 1940 and a November 1945 sample survey that the Census itself marks as not comparable with the census years.",
      texture: [
        { lineId: "unemployment", reason: "1.2% is the lowest reading in the whole series and the plainest statement of what the war did to the labor market" },
        { lineId: "electric", reason: "the farm gap closes fastest in this decade, and the war years sit in the middle of it" },
        { lineId: "power", reason: "use per customer nearly doubled between 1933 and 1944 while the price kept falling" }
      ],
      cells: {
        occupation: { a: cell("Operatives, 9,518 of 51,742 thousand in 1940, 18.4%", "hsus-d182", { year: 1940, note: "At the April 1940 census operatives outnumbered the two farm groups together (8,995 thousand, 17.4%) for the first time. Shares computed from the table’s own rows." }) },
        hours: { a: cell("45.2 hours", "hsus-d803", { year: 1944, note: "The highest reading in this series between 1929 and 1970." }) },
        earnings: { a: cell("$2,517 a year; $1.01 an hour", "hsus-d740", { year: 1944, note: "The annual figure is identical in 1944, 1945 and 1946 — $2,517 in each year. Weekly earnings were $45.70." }) },
        income: { a: cell("not measured", null, { absent: true,  note: "The first Census median family income is for 1947: $3,031." }) },
        home: { a: cell("43.6% owned in 1940; 53.2% at a November 1945 sample survey", "hsus-n243", { year: 1940, note: "The Census marks the 1945 figure as based on a sample survey and not comparable with the census years." }) },
        household: { a: cell("3.8 people in 1940; 36.3% of women in the labor force", "hsus-n240", { year: 1940, note: "Persons per occupied housing unit at the 1940 census. The women's figure is the 1944 annual average on a 14-and-over basis, and it is the highest reading of the war." }) },
        transport: { a: cell("25,566 thousand motor cars registered", "hsus-q153", { year: 1944, note: "Fewer than in 1941. Factory sales of passenger cars in 1944 were 600 vehicles." }) },
        basket: {
          a: {
            items: [
              { label: "a dozen eggs", price: 0.545, unit: "dozen", src: "hsus-e187", year: 1944 },
              { label: "half a gallon of milk, delivered", price: 0.312, unit: "half gallon", src: "hsus-e187", year: 1944 },
              { label: "a pound of butter", price: 0.500, unit: "pound", src: "hsus-e187", year: 1944 },
              { label: "a pound of round steak", price: 0.414, unit: "pound", src: "hsus-e187", year: 1944 },
              { label: "a pound of bread", price: 0.088, unit: "pound", src: "hsus-e187", year: 1944 }
            ]
          }
        },
        unemployment: { a: cell("1.2%", "hsus-d86", { year: 1944, note: "670 thousand people. The lowest reading in the series, which runs from 1890 to 1970." }) },
        electric: { a: cell("84.0% of dwellings; farm 42.2%", "hsus-s109", { year: 1944, note: "The farm share had been 9.2% in 1929." }) },
        power: { a: cell("1,151 kilowatt-hours a year", "hsus-s108", { year: 1944, note: "Per residential customer; the price was 3.51 cents a kilowatt-hour." }) },
        service: { a: cell("not measured", null, { absent: true,  note: "Not shown for this panel." }) },
        farmcity: { a: cell("not measured", null, { absent: true,  note: "Not shown for this panel." }) }
      }
    },

    /* ------------------------------------------------------------ 1955 ---- */
    {
      id: "1955",
      label: "1955",
      title: "The year the story is about",
      columns: [{ key: "a", label: "1955" }],
      construct: "1955 has an annual median family income, annual wages, hours and prices, and no housing census. Tenure and household size are shown at the 1950 and 1960 censuses that bracket the year; a December 1956 sample survey reads 60.4% owning, and the Census marks it as not comparable with the census years. Median family income counts FAMILIES, two or more related people living together, which is a narrower universe than all households.",
      texture: [
        { lineId: "unemployment", reason: "the ordinary background rate of the anchor year, so the panel is not read against a memory of full employment" },
        { lineId: "electric", reason: "this is the decade the farm gap closes, and 1955 is where it nearly disappears" },
        { lineId: "power", reason: "the appliances arrive as kilowatt-hours before they arrive as a list of objects" }
      ],
      cells: {
        occupation: { a: cell("Operatives, 12,080 of 58,999 thousand in 1950, 20.5%", "hsus-d182", { year: 1950, note: "The largest major group at both censuses that bracket 1955; at 1960, 11,754 of 67,990 thousand, 17.3%. Farmworkers were 11.8% in 1950 and 6.0% in 1960. Shares computed from the table’s own rows." }) },
        hours: { a: cell("40.7 hours", "hsus-d803", { year: 1955 }) },
        earnings: { a: cell("$4,356 a year; $1.86 an hour", "hsus-d740", { year: 1955, note: "Annual earnings per full-time employee in manufacturing; weekly earnings were $75.70." }) },
        income: { a: cell("$4,418 median, $4,962 mean", "census-f5", { year: 1955, note: "Median and mean money income of the 42,890 thousand families counted that year. The mean sits above the median because income is not distributed symmetrically; both are printed here for that reason." }) },
        home: { a: cell("55.0% owned in 1950, 61.9% in 1960", "hsus-n243", { year: 1950, note: "The largest decade-on-decade rise in the series is 1940 to 1950. A December 1956 sample survey reads 60.4%, marked by the Census as not comparable with census years." }) },
        household: { a: cell("3.5 people in 1950, 3.4 in 1960; 35.7% of women in the labor force", "hsus-n240", { year: 1950, note: "Persons per occupied housing unit at the bracketing censuses. The women's figure is the 1955 annual average, 16 and over, and it is below the 36.3% of 1944 on a 14-and-over basis; the series does not pass the wartime reading again until 1956. Median age at first marriage in 1955: 22.6 for men, 20.2 for women, close to the lowest the series records." }) },
        transport: { a: cell("52,145 thousand motor cars registered", "hsus-q153", { year: 1955, note: "Twice the 1944 count." }) },
        basket: {
          a: {
            items: [
              { label: "a dozen eggs", price: 0.606, unit: "dozen", src: "hsus-e187", year: 1955 },
              { label: "half a gallon of milk, delivered", price: 0.462, unit: "half gallon", src: "hsus-e187", year: 1955 },
              { label: "a pound of butter", price: 0.709, unit: "pound", src: "hsus-e187", year: 1955 },
              { label: "a pound of round steak", price: 0.903, unit: "pound", src: "hsus-e187", year: 1955 },
              { label: "a pound of bread", price: 0.177, unit: "pound", src: "hsus-e187", year: 1955 }
            ]
          }
        },
        unemployment: { a: cell("4.4%", "hsus-d86", { year: 1955, note: "2,852 thousand people." }) },
        electric: { a: cell("98.4% of dwellings; farm 94.4%", "hsus-s109", { year: 1955, note: "Urban and rural nonfarm dwellings were at 98.8%." }) },
        power: { a: cell("2,773 kilowatt-hours a year", "hsus-s108", { year: 1955, note: "Per residential customer, against 1,151 in 1944; the price was 2.65 cents a kilowatt-hour." }) },
        service: { a: cell("1,459 of 16,445 thousand women at work in 1950, 8.9%", "hsus-d182", { year: 1950, note: "Private household workers, down from 28.7% of women at work in 1900. Clerical work is the largest female line by 1950, at 4,502 thousand. Shares computed from the table’s own rows." }) },
        farmcity: { a: cell("not measured", null, { absent: true,  note: "Not shown for this panel." }) }
      }
    },

    /* ------------------------------------------------------------ 1965 ---- */
    {
      id: "1965",
      label: "1965",
      title: "Before the turn",
      columns: [{ key: "a", label: "1965" }],
      construct: "The same constructs as 1955: annual wages, hours, prices and median family income; decennial housing bracketed at 1960 and 1970. The eggs on this panel are the same source and the same unit as the eggs on the 1929 panel, which is the point of pricing them twice.",
      texture: [
        { lineId: "unemployment", reason: "read against 1955 it shows the ordinary rate barely moving across the decade the ledger is often asked to contrast" },
        { lineId: "power", reason: "the clearest single measure of what came into the house between 1955 and 1965" },
        { lineId: "service", reason: "the female occupation the century moved women into, against the one it moved them out of" }
      ],
      cells: {
        occupation: { a: cell("Operatives, 11,754 of 67,990 thousand in 1960, 17.3%", "hsus-d182", { year: 1960, note: "The largest major group at the 1960 census; farmworkers were 6.0%. Shares computed from the table’s own rows." }) },
        hours: { a: cell("41.2 hours", "hsus-d803", { year: 1965 }) },
        earnings: { a: cell("$6,389 a year; $2.61 an hour", "hsus-d740", { year: 1965, note: "Annual earnings per full-time employee in manufacturing; weekly earnings were $107.53." }) },
        income: { a: cell("$6,957 median, $7,704 mean", "census-f5", { year: 1965, note: "Money income of the 48,510 thousand families counted that year." }) },
        home: { a: cell("61.9% owned in 1960, 62.9% in 1970", "hsus-n243", { year: 1960, note: "The rise of the 1940s and 1950s does not repeat in the 1960s." }) },
        household: { a: cell("3.4 people in 1960, 3.2 in 1970; 39.3% of women in the labor force", "hsus-n240", { year: 1960, note: "Persons per occupied housing unit at the bracketing censuses. The women's figure is the 1965 annual average, 16 and over. Median age at first marriage in 1965: 22.8 for men, 20.6 for women." }) },
        transport: { a: cell("75,258 thousand motor cars registered", "hsus-q153", { year: 1965 }) },
        basket: {
          a: {
            items: [
              { label: "a dozen eggs", price: 0.527, unit: "dozen", src: "hsus-e187", year: 1965 },
              { label: "half a gallon of milk, delivered", price: 0.526, unit: "half gallon", src: "hsus-e187", year: 1965 },
              { label: "a pound of butter", price: 0.754, unit: "pound", src: "hsus-e187", year: 1965 },
              { label: "a pound of round steak", price: 1.084, unit: "pound", src: "hsus-e187", year: 1965 },
              { label: "a pound of bread", price: 0.209, unit: "pound", src: "hsus-e187", year: 1965 }
            ]
          }
        },
        unemployment: { a: cell("4.5%", "hsus-d86", { year: 1965, note: "3,366 thousand people, against 4.4% and 2,852 thousand in 1955." }) },
        electric: { a: cell("not measured", null, { absent: true,  note: "The dwelling-unit series stops at 1956, when it read 98.8%." }) },
        power: { a: cell("4,933 kilowatt-hours a year", "hsus-s108", { year: 1965, note: "Per residential customer, against 2,773 in 1955; the price was 2.25 cents a kilowatt-hour." }) },
        service: { a: cell("1,760 of 22,304 thousand women at work in 1960, 7.9%", "hsus-d182", { year: 1960, note: "Private household workers. Clerical workers were 6,497 thousand, 29.1% of women at work, and the largest female line by a wide margin. Shares computed from the table’s own rows." }) },
        farmcity: { a: cell("not measured", null, { absent: true,  note: "Not shown for this panel." }) }
      }
    }
  ];

  W.registers["american-household"] = {
    schema: 1,
    edition: {
      id: "american-household",
      title: "An American household, 1900–2025",
      place: "the United States",
      period: "1900 to 2025",
      stratum: "the household in the middle of the record, as each era's own survey defines it",
      built: "Segment 1: 1900, 1915, 1929–1933, 1944, 1955, 1965. The remaining eras are in preparation.",
      selectionRule: "Eras are decadal where the century is quiet and anchored at documented breaks where it is not. The panels here are 1900, 1915, 1929 with 1933 beside it, 1944, 1955 and 1965."
    },
    sources: sources,
    wage: wage,
    lines: lines,
    eras: eras
  };
})();
