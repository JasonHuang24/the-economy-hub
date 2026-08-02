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
 *     `sources` below — and, where one display string or note draws on more
 *     than one source, a `srcs` list naming the additional keys — plus a
 *     per-cell `year` where the value's year differs from the era’s;
 *   - prose on the page repeats no digit this register does not hold;
 *   - the static no-JS tables in the page carry data-ledger-cell attributes and
 *     are audited against this register at run time (see engine `audit()`).
 *     The runtime audit covers display strings, basket arithmetic and the
 *     resolution of every src/srcs key; construct text and prose digits are
 *     audited by the review process, not by the runtime;
 *   - hours-prices are NOT stored. They are computed by the engine as
 *     nominal price / nominal hourly earnings, both taken from this register,
 *     so no derived digit is ever hand-entered.
 *
 * Twelve eras, 1900 to 2025.
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
    "ces-ahe": {
      issuer: "U.S. Bureau of Labor Statistics",
      work: "Current Employment Statistics, national, series CEU0500000008",
      series: "average hourly earnings of production and nonsupervisory employees, total private, current dollars, annual average",
      population: "production and nonsupervisory employees on private nonfarm payrolls; an average, not a median. Gross pay before deductions, including overtime and paid leave, excluding employer benefit contributions. It is a wage, not a household budget.",
      vintage: "the BLS time-series file as captured 2026-03-07",
      retrieved: "2026-07-31"
    },
    "ces-awh": {
      issuer: "U.S. Bureau of Labor Statistics",
      work: "Current Employment Statistics, national, series CEU0500000007",
      series: "average weekly hours of production and nonsupervisory employees, total private, annual average",
      population: "production and nonsupervisory employees on private nonfarm payrolls, part-time workers included. This is a wider universe than the manufacturing series shown for the earlier eras, and the two are never joined into one line.",
      vintage: "the BLS time-series file as captured 2026-03-07",
      retrieved: "2026-07-31"
    },
    "ces-awe": {
      issuer: "U.S. Bureau of Labor Statistics",
      work: "Current Employment Statistics, national, series CEU0500000030",
      series: "average weekly earnings of production and nonsupervisory employees, total private, current dollars, annual average",
      population: "production and nonsupervisory employees on private nonfarm payrolls",
      vintage: "the BLS time-series file as captured 2026-03-07",
      retrieved: "2026-07-31"
    },
    "ces-emp": {
      issuer: "U.S. Bureau of Labor Statistics",
      work: "Current Employment Statistics, national, series CEU0000000001 and CEU3000000001",
      series: "all employees, total nonfarm, and all employees, manufacturing, in thousands",
      population: "employees on nonfarm payrolls. Payroll counts are jobs rather than people, and they exclude farm work, the self-employed and private household workers. Shares shown are computed from the two series.",
      vintage: "the BLS time-series file as captured 2026-03-07",
      retrieved: "2026-07-31"
    },
    "cps-unemp": {
      issuer: "U.S. Bureau of Labor Statistics",
      work: "Current Population Survey, series LNU04000000",
      series: "unemployment rate, 16 years and over, not seasonally adjusted, annual average",
      population: "the civilian labor force 16 years and over. The modern survey measures unemployment directly; the figures shown for 1900 to 1965 are reconstructions from another source, and the two are not drawn as one line.",
      vintage: "the BLS time-series file as captured 2025-10-01",
      retrieved: "2026-07-31"
    },
    "cps-flfp": {
      issuer: "U.S. Bureau of Labor Statistics",
      work: "Current Population Survey, series LNU01300002",
      series: "labor force participation rate, women 16 years and over, not seasonally adjusted, annual average",
      population: "women 16 years and over in the civilian noninstitutional population. The highest annual reading in this series is 60.0 per cent in 1999; 2000 reads 59.9.",
      vintage: "the BLS time-series file as captured 2025-10-01",
      retrieved: "2026-07-31"
    },
    "hsus-g106": {
      issuer: "U.S. Bureau of the Census",
      work: "Historical Statistics of the United States, Colonial Times to 1957 (1960 edition), Chapter G, series G 99-130 (printed pp. 160-166)",
      series: "average (mean) family personal income per consumer unit, current dollars: 1929 = $2,335 (G 106, identically G 120)",
      population: "families AND unattached individuals together — 36.1 million consumer units in 1929; the per-family series (G 126) is blank for 1929, so no 1929 mean for families alone exists. Family personal income includes nonmoney items (wages in kind, farm food and fuel consumed on farms, imputed rent of owner-occupied homes) and is NOT the Census money-income construct of the later panels; the chapter itself rules the two families of series not directly comparable. The 1929 figures are Selma Goldsmith's adjustment of the Brookings study (Studies in Income and Wealth, vol. 23, 1958, p. 93), and the Census prints: 'Because of inadequacies in the basic source data, the estimates for 1929 are less reliable than for other years in the series.' No median exists for 1929 in this construct, and the prewar points are 1929, 1935-36 and 1941 only — there is no 1933 estimate.",
      vintage: "1960 edition as scanned by census.gov; digits read visually at 220 dpi and arithmetic-verified (this scan fills 3/8 and 0/6 loops)",
      retrieved: "2026-07-31"
    },
    "bls-col1901": {
      issuer: "U.S. Department of Labor, Commissioner of Labor",
      work: "Eighteenth Annual Report of the Commissioner of Labor, 1903: Cost of Living and Retail Prices of Food (printed pp. 15, 20, 75)",
      series: "average annual income of the 25,440 families canvassed in 1901: $749.50",
      population: "families of wage workers and of salaried persons earning not more than $1,200 a year, in the principal industrial centers of 33 states including the District of Columbia; 25,440 families, 124,108 persons; families of persons in business on their own account excluded. An AVERAGE, never a median, of that population only — not a national figure, and never joined to the Census median series that begins in 1947. The report's 2,567-family detail subsample prints a higher average ($827.19); the report itself says those families were selected only on their ability to report in detail and were larger than the average family canvassed — the survey's figure is the 25,440-family one.",
      vintage: "1903 report as scanned by FRASER; digits read visually at 220 dpi",
      retrieved: "2026-07-31"
    },
    "bls-mlr1946": {
      issuer: "U.S. Bureau of Labor Statistics",
      work: "Expenditures and Savings of City Families in 1944, Monthly Labor Review, January 1946, pp. 1-5 (prepared by Dorothy S. Brady, chief, Cost of Living Division)",
      series: "median net income after payment of personal taxes, families and single persons combined, calendar year 1944: $2,700 (1941: $1,900)",
      population: "a cross section of city consumers — families and single persons living as civilians: some 1,700 consumers in 102 urban communities, cities from 2,500 population up, all regions. A MEDIAN of income AFTER personal taxes with single persons in the denominator: not the Census pre-tax money-income construct for families, and the two are never joined. The article's tables are marked preliminary, subject to slight revision.",
      vintage: "Monthly Labor Review, January 1946, as scanned by FRASER; digits read visually at 220 dpi",
      retrieved: "2026-07-31"
    },
    "bls-mcf-earners": {
      issuer: "U.S. Bureau of Labor Statistics",
      work: "Married-couple families by number and relationship of earners, 1967-2007 (Women in the Labor Force: A Databook, table 23)",
      series: "married-couple families in which both husband and wife had earnings during the year: 54.5% in 1985 (27,787 of 50,978 thousand), against 43.6% in 1967; families with the husband as sole earner were 20.4% in 1985",
      population: "married-couple families in the Current Population Survey annual demographic supplement; an earner is anyone with earnings at any time during the calendar year. This is NOT the share of all households with two earners, and it is a different construct from the both-spouses-EMPLOYED share the Bureau publishes today (49.1% of married-couple families in 2025), which counts a survey reference week and includes retiree couples — the two are never joined.",
      vintage: "databook table as published on bls.gov",
      retrieved: "2026-07-31"
    },
    "bls-b1231": {
      issuer: "U.S. Bureau of Labor Statistics",
      work: "Bulletin 1231, New Housing and Its Materials 1940-56 (1958), Tables 1 and 8",
      series: "average floor area and median proposed selling price of new privately owned nonfarm 1-family houses; the 1955 columns read 1,170 square feet and $13,700",
      population: "houses in projects for which building permits were issued or on which work was started during the first 3 months of 1955 in 63 areas, from a stratified three-stage sample of 6,000 projects and 37,000 dwelling units, about 13 percent of new private dwelling units. The floor area is a MEAN and the price is a MEDIAN of PROPOSED selling prices recorded when building started. Both are three construct axes away from the Census series used on the later panels — median floor area of houses COMPLETED, and median sales price of houses SOLD — and neither is ever joined to them. The 1940 and 1950 columns of Table 1 come from studies based on FHA records, a different universe again.",
      vintage: "1958 bulletin as scanned by FRASER; read at 200-600 dpi, the table's optical character recognition being unreliable",
      retrieved: "2026-07-31"
    },
    "bea-nipa21": {
      issuer: "U.S. Bureau of Economic Analysis",
      work: "National Income and Product Accounts, Table 2.1, Personal Income and Its Disposition, annual",
      series: "line 35, personal saving as a percentage of disposable personal income (A072RC), 1929 to 2025",
      population: "the personal sector of the national accounts, which is households together with the nonprofit institutions that serve them. Personal saving is what is left of disposable personal income after personal outlays: a residual in an accounting identity, not a survey of what families set aside, and not a rate any particular household lived. The series begins in 1929, so the 1900 and 1915 panels carry no reading. Its only negative annual values are 1932 and 1933.",
      vintage: "the annual table as published July 30, 2026",
      retrieved: "2026-07-31"
    },
    "nber-w2101": {
      issuer: "Daniel M. G. Raff and Lawrence H. Summers",
      work: "Did Henry Ford Pay Efficiency Wages? National Bureau of Economic Research Working Paper No. 2101",
      series: "the terms announced by the Ford Motor Company on January 5, 1914 and the conditions of the profit-sharing plan that followed",
      population: "scholarship, not a statistical series: the authors' reading of the announcement, of a 1914 company pamphlet, of the contemporary press and of the Ford Archives. The estimates of how many workers qualified are attributed in the paper to their own sources and disagree with one another.",
      vintage: "working paper dated December 1986; a revised version appeared in the Journal of Labor Economics in 1987 and is not the text read here",
      retrieved: "2026-07-31"
    },
    "bls-ap": {
      issuer: "U.S. Bureau of Labor Statistics",
      work: "Average Price Data, U.S. city average, not seasonally adjusted",
      series: "average prices for eggs (grade A, large, per dozen), bread (white, pan, per lb.), milk (fresh, whole, fortified, per half gallon to 1997 and per gallon from 1995), butter (salted, grade AA, stick, per lb. to 2012, and butter, stick, per lb. from 2018), round steak (USDA Choice, boneless, per lb.), and electricity per kilowatt-hour",
      population: "priced across the urban United States. These are monthly series and the file used publishes no annual average, so every value shown is the JUNE reading of its year and is named as such. The butter series has a gap between April 2012 and April 2018; the milk series changes unit between the two overlapping series.",
      vintage: "the BLS time-series files as captured 2025-05-23 and 2025-08-02",
      retrieved: "2026-07-31"
    },
    "eia-gas": {
      issuer: "U.S. Energy Information Administration",
      work: "Monthly Energy Review, Table 9.4, Retail Motor Gasoline and On-Highway Diesel Fuel Prices",
      series: "U.S. city average retail price, dollars per gallon including taxes, annual average: leaded regular through the 1980s and unleaded regular from 1985",
      population: "retail sales across U.S. cities. The series begins in 1949, so the panels before 1955 carry no fuel price. The two grades are never added into one figure.",
      vintage: "table T09.04 as published on eia.gov",
      retrieved: "2026-07-31"
    },
    "usps-rates": {
      issuer: "United States Postal Service, Office of the Historian",
      work: "Rates for Domestic Letters Since 1863",
      series: "the first-class rate for a single-weight domestic letter, in force at the date shown",
      population: "the published rate, not an average of what was paid. Rates change on a date rather than at the turn of a year, so each value is the rate in force during the panel's year.",
      vintage: "as published on about.usps.com",
      retrieved: "2026-07-31"
    },
    "census-h5": {
      issuer: "U.S. Census Bureau",
      work: "Historical Income Tables: Households, Table H-5, Race and Hispanic Origin of Householder - Households by Median and Mean Income: 1967 to 2024 (all races)",
      series: "median and mean money income of households, in current dollars",
      population: "households as of March of the following year. A HOUSEHOLD is everyone occupying a housing unit, related or not, which is a wider universe than the FAMILY counted in the 1955 and 1965 panels. Money income is pre-tax cash and excludes capital gains and noncash benefits. The survey was redesigned in 2013 and the table prints two values for that year.",
      vintage: "released with the 2025 CPS ASEC",
      retrieved: "2026-07-31"
    },
    "census-hh6": {
      issuer: "U.S. Census Bureau",
      work: "Table HH-6, Average Population Per Household and Family: 1940 to Present",
      series: "average population per household",
      population: "households in the Current Population Survey. This is a different instrument from the persons-per-occupied-unit figures shown for 1900 to 1965, and the two are not drawn as one line.",
      vintage: "internet release December 2025",
      retrieved: "2026-07-31"
    },
    "census-hvs": {
      issuer: "U.S. Census Bureau",
      work: "Housing Vacancy Survey, Table 14, Homeownership Rates by Area: 1960 to 2024",
      series: "the annual homeownership rate for the United States",
      population: "occupied housing units in a sample survey. This is not the decennial census series used for 1900 to 1965: the survey reads higher at the years where both exist, and the two are shown separately rather than joined.",
      vintage: "annual 2024 tables",
      retrieved: "2026-07-31"
    },
    "census-nrs": {
      issuer: "U.S. Census Bureau",
      work: "New Residential Sales, median and average sales prices of new homes sold in the United States, annual",
      series: "median and average sales price of new single-family homes sold, current dollars",
      population: "new single-family houses SOLD in the year, which is not the stock of houses people live in. The file used is the July 24, 2026 release, which publishes through 2025 and revises earlier years: 2023 reads $428,600 in it.",
      vintage: "release of July 24, 2026",
      retrieved: "2026-07-31"
    },
    "census-sqft": {
      issuer: "U.S. Census Bureau",
      work: "Characteristics of New Housing, median and average square feet of floor area in new single-family houses completed",
      series: "median and average square feet, United States, annual, from 1973",
      population: "new single-family houses COMPLETED in the year. The series begins in 1973; there is no same-construct figure for any earlier panel.",
      vintage: "annual file as published on census.gov",
      retrieved: "2026-07-31"
    },
    "fhwa-mv": {
      issuer: "Federal Highway Administration",
      work: "Highway Statistics, Table MV-200 (State Motor-Vehicle Registrations, by Years, 1900-1995) and Table MV-1 (annual)",
      series: "automobile registrations and truck registrations, total, United States",
      population: "vehicles registered with the States, not households owning one. Every figure shown is the table's TOTAL column, private and commercial plus publicly owned. The automobile column excludes vehicles registered as trucks, which is why the truck count is printed beside it. The figures agree exactly with the Census reprint used for the earlier panels at 1955 and 1965. The split between the two columns is the issuer's processing construct: at the 2012 data year roughly fourteen million vehicles move from the automobile column to the truck column with no announcing footnote (the 2011 table is stamped REVISED), so no single year can be named as the year trucks passed automobiles on this table, and that break falls between the 2005 and 2015 panels.",
      vintage: "MV-200 dated April 1997; MV-1 editions for 2005 (October 2006), 2015 (January 2017) and 2024 (January 2026), each read for its own data year",
      retrieved: "2026-07-31"
    },
    "census-ms2": {
      issuer: "U.S. Census Bureau",
      work: "Table MS-2, Estimated Median Age at First Marriage, by Sex: 1890 to Present",
      series: "estimated median age at first marriage",
      population: "decennial censuses for 1890-1940, Current Population Survey thereafter; the Bureau labels the whole series ESTIMATED. There are no figures between the census years before 1947.",
      vintage: "Internet release December 2025",
      retrieved: "2026-07-30"
    },
    "census-coh-rent": {
      issuer: "U.S. Census Bureau",
      work: "Historical Census of Housing Tables, Gross Rents (“Median Gross Rents: Unadjusted”)",
      series: "median monthly gross rent, United States, current dollars, at each census 1940-2000",
      population: "renter-occupied housing units at the census date. GROSS RENT is the Bureau’s own construct and it is not rent alone: “the monthly amount of rent plus the estimated average monthly cost of utilities and fuels.” The utility bill is already inside this figure, which is why no line on this page ever adds a rent to a bill. The series begins at 1940 because the housing census does; there is no earlier figure and none is interpolated.",
      caveat: "The companion table adjusted to 2000 dollars uses CPI-U-RS factors and is not used here: this page carries nominal dollars and hours of work only.",
      vintage: "the compilation as published on census.gov",
      retrieved: "2026-08-01"
    },
    "acs-rent": {
      issuer: "U.S. Census Bureau",
      work: "American Community Survey, 1-year estimates, table B25064",
      series: "median gross rent, United States, current dollars",
      population: "the table’s own universe is “renter-occupied housing units paying cash rent” — not all renters. Gross rent carries the same construct as the decennial series: rent plus the estimated average monthly cost of utilities and fuels. The ACS is a different instrument from the decennial census and the two are never drawn as one line.",
      vintage: "2005, 2015 and 2024 one-year files as published in the ACS summary file",
      retrieved: "2026-08-01"
    },
    "acs-smoc": {
      issuer: "U.S. Census Bureau",
      work: "American Community Survey, 1-year estimates, table B25088",
      series: "median selected monthly owner costs, by mortgage status, United States, current dollars",
      population: "owner-occupied housing units. SELECTED monthly owner costs is the Bureau’s word: the sum of mortgage payments, real-estate taxes, insurance, utilities and fuels, and where they apply condominium or mobile-home fees. Like gross rent it already contains the utility bill, which is what makes the two sides comparable and is also why neither is ever added to the bill line.",
      vintage: "2005, 2015 and 2024 one-year files as published in the ACS summary file",
      retrieved: "2026-08-01"
    },
    "census-coh-values": {
      issuer: "U.S. Census Bureau",
      work: "Historical Census of Housing Tables, Home Values (“Median Home Values: Unadjusted”)",
      series: "median home value, United States, current dollars, at each census 1940-2000",
      population: "the Bureau’s own wording: “owner-occupied single-family housing units on less than 10 acres without a business or medical office on the property.” It is a VALUE and not a sale — nothing in it records a transaction. The series begins at 1940 because the housing census does, and it ends at 2000: from 2005 the same subject is carried by the American Community Survey, a different instrument on a wider universe, and the two are never drawn as one line.",
      caveat: "The companion table adjusted to 2000 dollars with CPI-U-RS factors is not used here — this page carries nominal dollars and hours of work only. In that adjusted table the 1940 figure reads $30,600, which is the $2,938 shown on this page restated in 2000 dollars and is not a second measurement.",
      vintage: "the compilation as published on census.gov",
      retrieved: "2026-08-01"
    },
    "census-1930-families": {
      issuer: "U.S. Bureau of the Census",
      work: "Fifteenth Census of the United States: 1930, Population, Volume VI, Families, Table 26",
      series: "median value of owned nonfarm homes and median monthly rental of rented nonfarm homes, United States, current dollars",
      population: "nonfarm homes occupied by private families. The population schedule asked each nonfarm owner family for the home's approximate current market value and each nonfarm renter family for the monthly rental, its monthly equivalent, or approximate rental value. Table 26 prints $4,779 and $27.15 respectively for Total, All classes.",
      caveat: "This is a 1930 population-census family instrument, not the later Census of Housing series. Farm homes were collected on the farm schedule. The rent is monthly rental, not the post-1940 gross-rent construct that includes utilities and fuels; neither reading is joined to the later housing-census series.",
      vintage: "1933 publication",
      retrieved: "2026-08-02"
    },
    "census-pre1940-value-gap": {
      issuer: "U.S. Bureau of the Census",
      work: "Thirteenth Census of the United States: 1910, Volume I, Chapter XVI, Ownership of Homes; and Fourteenth Census Monographs, II, Farm and Home Proprietorship and Indebtedness",
      series: "documented limits of the pre-1930 home inquiries",
      population: "the 1910 volume says the inquiries in 1900 and 1910 did not go beyond proprietorship and encumbrance, because Congress did not provide for supplemental data on value and amount of encumbrance. The 1920 monograph's value tables cover owned MORTGAGED nonfarm homes, not all owned homes and not a national median of their values.",
      caveat: "The 1890 special investigation likewise reports the value of encumbered owner-occupied farms and homes, a restricted mortgage universe. None of these tables supplies the all-owned-home national median required by this line.",
      vintage: "1913 and 1923 publications",
      retrieved: "2026-08-02"
    },
    "acs-value": {
      issuer: "U.S. Census Bureau",
      work: "American Community Survey, 1-year estimates, table B25077",
      series: "median value (dollars), United States, current dollars",
      population: "the table’s universe is “Owner-occupied housing units” — all of them, condominiums and mobile homes included, which is wider than the decennial series’ single-family units on less than 10 acres. The Bureau defines what it collects: “Value is the respondent’s estimate of how much the property (house and lot, mobile home and lot (if lot owned), or condominium unit) would sell for if it were for sale.” It is an owner’s estimate of a price, not a price paid, and an owner of a duplex or small apartment building is told to report the value of the whole building and its land.",
      caveat: "The Bureau flags a break inside this series, and it falls between the 2005 and the 2015 readings shown here: the 2008 questionnaire dropped the pre-coded response categories for a write-in box and reworded the question, and the Bureau’s own content test found the change “may introduce an inconsistency in the data produced for this question as observed from the years 2007 to 2008.” Its published comparability note asks for caution across that year. A separate earlier change does NOT affect these panels: from 2004 the table covers all owner-occupied units, where 1996-2003 covered specified owner-occupied units only, so 2005, 2015 and 2024 are on one universe.",
      vintage: "2005, 2015 and 2024 one-year files as published in the ACS summary file",
      retrieved: "2026-08-01"
    },
    "fhfa-mirs": {
      issuer: "Federal Housing Finance Agency",
      work: "Monthly Interest Rate Survey, Table 9: Terms on Conventional Single-Family Mortgages, Annual National Averages, All Homes",
      series: "average contract interest rate, average term to maturity, average loan amount, average purchase price and average loan-to-price ratio, on loans closed in the year",
      population: "conventional single-family mortgages closed in the year, as reported by a panel of lenders; averages, never medians, and averages of LOANS MADE rather than of houses or of households. The survey begins in 1963, so no panel before 1965 carries it, and the FHFA published its final survey on 29 May 2019 — no same-construct figure exists for the 2025 panel.",
      caveat: "The term shown is the term AT ORIGINATION. It is not how long borrowers actually held these loans: mortgages are commonly ended early by sale or refinancing, so a term of 28 years is the length of the contract and not a measured life. Monthly principal-and-interest payments and repayment totals are this page's amortisation of the survey's average loan, rate and term; they exclude taxes, insurance, utilities and fees.",
      vintage: "the annual tables as published at the survey’s discontinuation",
      retrieved: "2026-08-01"
    },
    "freddie-pmms": {
      issuer: "Freddie Mac",
      work: "Primary Mortgage Market Survey, historical weekly series",
      series: "the U.S. weekly average contract rate on a 30-year fixed-rate mortgage; the value shown is the mean of the year’s weekly readings",
      population: "rates offered on conforming, conventional, fully amortizing 30-year fixed-rate loans to well-qualified borrowers with a 20 per cent down payment, as surveyed from lenders. It is an offered rate on one product, not an average of loans actually closed, and it is never joined to the FHFA contract-rate series.",
      vintage: "the weekly history file as captured 2026-08-01; the 2025 mean is taken over 53 weekly readings",
      retrieved: "2026-08-01"
    },
    "eia-861": {
      issuer: "U.S. Energy Information Administration",
      work: "Form EIA-861, Table 5.A, Average Monthly Bill — Residential",
      series: "number of customers, average monthly consumption in kilowatt-hours, average price in cents per kilowatt-hour, and average monthly bill in dollars, U.S. total",
      population: "residential customers of reporting electric utilities. The bill is the issuer’s own published figure, not this page’s multiplication of a price by a quantity. The form’s annual archive begins in 2002, so no panel before 2005 carries a bill.",
      caveat: "The U.S. total row of this table is the residential one; the same file prints commercial and industrial totals many times larger.",
      vintage: "the 2024 table as released 7 October 2025, and the 2005 and 2015 tables from the form’s own annual archive",
      retrieved: "2026-08-01"
    },
    "census-coh-fuels": {
      issuer: "U.S. Census Bureau",
      work: "Historical Census of Housing Tables, House Heating Fuel",
      series: "percentage of units by the fuel used to heat the home, United States, at each census 1940-2000",
      population: "the 1940 table counts occupied units REPORTING heating fuel (33,884,379 of them); the 2000 table counts occupied units (105,480,101). The denominators are not the same and each value is shown with its year. Columns that read NA in 1940 — electricity and bottled gas — mean the category was not carried, not that it was zero.",
      vintage: "the compilation as published on census.gov",
      retrieved: "2026-08-01"
    },
    "bls-r991": {
      issuer: "U.S. Bureau of Labor Statistics",
      work: "Report 991, 100 Years of U.S. Consumer Spending: Data for the Nation, New York City, and Boston (2006)",
      series: "average annual expenditures and expenditure shares, United States column, by survey wave: 1901, 1918-19, 1934-36, 1950, 1960-61, 1972-73, 1984-85, 1996-97 and 2002-03",
      population: "the expenditure survey of each wave, and the populations DIFFER across waves: 1901 is families of urban wage workers and salaried people; the modern Consumer Expenditure Survey covers all consumer units. Every share is a share of MEAN expenditures — of the average family’s spending, never of the median household’s. The 1901 wave folds healthcare and insurance into one category; later waves print healthcare alone.",
      caveat: "The compilation ends at 2002-03. Any figure later than that comes from a separate Consumer Expenditure Survey release and is not part of this lineage.",
      vintage: "the 2006 report as archived from bls.gov",
      retrieved: "2026-08-01"
    },
    "ce-1710": {
      issuer: "U.S. Bureau of Labor Statistics",
      work: "Consumer Expenditure Survey, Table 1710, Housing tenure: annual expenditure means, 2024",
      series: "average annual expenditures by category for all consumer units and by housing tenure — homeowner with a mortgage, homeowner without a mortgage, and renter",
      population: "135,760 thousand consumer units, of which 50,122 thousand are homeowners with a mortgage and 47,642 thousand are renters. Means, never medians. A renter’s utility spending reads low partly because much of it sits inside contract rent rather than in a separate bill.",
      caveat: "Shares of total expenditures computed from this table are computed here, not published by the Bureau, and are labelled as such wherever they appear.",
      vintage: "the 2024 calendar-year tables",
      retrieved: "2026-08-01"
    },
    "hsus-q155": {
      issuer: "U.S. Bureau of the Census",
      work: "Historical Statistics of the United States, Colonial Times to 1970 (Bicentennial Edition), Part 2",
      series: "Series Q 148-162, column Q 155 - truck registrations, thousands, 1900-1970",
      population: "trucks registered with the States, the companion column to the automobile count at Q 153. A registration count is not a count of households: firms register trucks, and most of this column is commercial.",
      caveat: "The column is BLANK at 1900, 1901, 1902 and 1903 and prints its first figure at 1904, seven hundred trucks in the whole country. Blank is not zero and nothing is interpolated back. The series ends at 1970; the later truck readings on this page come from the Federal Highway Administration’s own annual volumes and are never drawn as one line with this column.",
      vintage: "1975 edition",
      retrieved: "2026-08-02"
    },
    "ce-1702-2015": {
      issuer: "U.S. Bureau of Labor Statistics",
      work: "Consumer Expenditure Survey, Table 1702, Housing tenure and type of area: annual expenditure means, shares, standard errors, and coefficients of variation, 2015",
      series: "average annual expenditures by category, with the Bureau’s own percentage shares, for all consumer units and by housing tenure",
      population: "128,437 thousand consumer units, of which 45,453 thousand are homeowners with a mortgage and 48,388 thousand are renters. Means, never medians; income before taxes averaged $69,627.",
      caveat: "Unlike the 2024 table used elsewhere on this page, THIS table publishes the percentage shares itself, so the shares taken from it are the Bureau’s and not this page’s arithmetic. The 2015 table is numbered 1702 and the 2024 one 1710; they are the same annual product under different numbering.",
      vintage: "the 2015 calendar-year tables",
      retrieved: "2026-08-02"
    },
    "eia-esr1995": {
      issuer: "U.S. Energy Information Administration",
      work: "Electric Sales and Revenue 1995 (DOE/EIA-0540(95)), and the same annual report for 1994 and 1996-2000",
      series: "the report’s own statement of scope, read to establish what the record does and does not contain between 1970 and the Form EIA-861 bill tables",
      population: "electric utilities filing Form EIA-861. The Preface states the report provides information on “electricity sales, associated revenue, average revenue per kilowatthour sold, and number of consumers throughout the United States.”",
      caveat: "It publishes NO average monthly bill and NO consumption per customer. Sales divided by consumers would be a derived digit and this page does not compute it, so the years between 1970 and the Table 5.A series carry no reading of use per customer.",
      vintage: "the 1995 annual report",
      retrieved: "2026-08-02"
    }
  };

  /* ------------------------------------------------------------- wage spine */

  var wage = {
    label: "one hour of a production worker’s pay: manufacturing to 1965, all private industry from 1973",
    unitNote: "average hourly earnings, an average and never a median",
    values: {
      "1900": { v: 0.152, src: "hsus-d770" },
      "1915": { v: 0.212, src: "hsus-d770" },
      "1929": { v: 0.56, src: "hsus-d802" },
      "1933": { v: 0.44, src: "hsus-d802" },
      "1944": { v: 1.01, src: "hsus-d802" },
      "1955": { v: 1.86, src: "hsus-d802" },
      "1965": { v: 2.61, src: "hsus-d802" },
      "1973": { v: 4.14, src: "ces-ahe" },
      "1985": { v: 8.73, src: "ces-ahe" },
      "1995": { v: 11.65, src: "ces-ahe" },
      "2005": { v: 16.11, src: "ces-ahe" },
      "2015": { v: 21.03, src: "ces-ahe" },
      "2025": { v: 31.35, src: "ces-ahe" }
    },
    splices: [
      "1900 and 1915 are taken from Douglas’s payroll-manufacturing series as the Census reprints it (D 770); 1929 onward from the Bureau of Labor Statistics production-worker series (D 802).",
      "The two lineages overlap: at 1909 D 770 reads 17.9 cents and D 802 reads 19 cents; at 1914 D 770 reads 21.3 cents and D 802 reads 22 cents. They are close, but they are not the same measurement, and no value here is carried across the join.",
      "From 1973 the spine is the Bureau of Labor Statistics series for production and nonsupervisory employees across ALL private industry (CEU0500000008), because manufacturing employs a shrinking share of the country across these panels. That is a second join. Both series exist in the 1960s: at 1964 the manufacturing series reads $2.53 and the total-private series reads $2.53; at 1970 they read $3.36 and $3.41. Close is not the same, and nothing is carried across."
    ]
  };

  /* ------------------------------------------------------------------ lines */

  /* `href` is the line's deep link into the chapter that owns its mechanism
     (CHARTER §PURPOSE 1 and §WIRING MAP), relative to ledger/. A line whose
     domain the wiring map gives no canonical home carries no href: that is the
     charter's own boundary clause, not an omission, and the `home` field below
     records which. Every target was read for the mechanism before wiring — a
     pointer is a promise about the target's CONTENT, not about its title. */
  var groups = [
    { id: "work", label: "The earner and the week" },
    { id: "money", label: "What came in" },
    { id: "home", label: "The home" },
    { id: "systems", label: "What the house used" },
    { id: "people", label: "The household and getting about" },
    { id: "basket", label: "The basket" }
  ];

  var lines = [
    { id: "occupation", label: "What the earner does", group: "core", band: "work",
      href: "../books/work/chapter-01.html", home: "IV.1, on what jobs pay and why",
      caveat: "the census’s own largest group, on a classification that changes" },
    { id: "hours", label: "Hours in the working week", group: "core", band: "work",
      href: "../books/work/chapter-09.html", home: "IV.9, on the length of the week",
      caveat: "an average, in one industry, and the industry changes at 1973" },
    { id: "earnings", label: "A year’s earnings", group: "core", band: "work",
      href: "../books/work/chapter-02.html", home: "IV.2, on growth and paychecks",
      caveat: "per worker, not per household; the series splices twice" },
    { id: "unemployment", label: "Out of work", group: "texture", band: "work", domain: "Risk and security",
      href: "../books/work/chapter-03.html", home: "IV.3, on why the floor is not zero",
      caveat: "percent of the labor force; the interwar readings are estimates" },
    { id: "income", label: "A family’s income", group: "core", band: "money",
      href: "../books/work/chapter-02.html", home: "IV.2, on growth and paychecks",
      caveat: "the survey population changes at nearly every panel" },
    { id: "saving", label: "Saved out of income", group: "texture", band: "money", domain: "Credit and debt",
      home: "no chapter carries the saving rate; II.7 and II.2 own credit, which is not this",
      caveat: "an accounting residual, not a survey of what families set aside" },
    { id: "budget", label: "Where the money went", group: "texture", band: "money", domain: "Budget shares — the Engel arc",
      home: "no chapter carries the composition of a household budget",
      caveat: "shares of what was SPENT, not of income" },
    { id: "insurance", label: "Insurance", group: "texture", band: "money", domain: "Insurance and the premium",
      home: "no chapter carries insurance as a household outlay",
      caveat: "the surveys’ own category, relabelled twice across the page" },
    { id: "home", label: "The home", group: "core", band: "home",
      href: "../books/countries/chapter-12.html", home: "III.12, on what housing costs",
      caveat: "owner-occupied as a percent of occupied units" },
    { id: "value", label: "What a house was worth", group: "core", band: "home",
      href: "../books/countries/chapter-12.html", home: "III.12, which carries the mechanism of why a house’s price rises — the value settles on the land",
      caveat: "a value, never a sale; the instrument changes at 2005" },
    { id: "homesize", label: "The new house", group: "texture", band: "home", domain: "The home’s systems",
      home: "III.12 owns housing cost but carries nothing on the size of a house",
      caveat: "a house just built, not the house lived in" },
    { id: "farmcity", label: "Farm and city", group: "texture", band: "home", domain: "Geography and the commute",
      home: "no chapter carries the farm-to-city move",
      caveat: "the split does not add to the total, on the table’s own note" },
    { id: "roof", label: "What the roof cost", group: "core", band: "home",
      href: "../books/countries/chapter-12.html", home: "III.12, which carries the mechanism of why rent rises",
      caveat: "already contains the utilities; never added to the bill line" },
    { id: "loan", label: "Mortgage payment and term", group: "texture", band: "home", domain: "Credit and debt",
      href: "../books/history/chapter-02.html", home: "II.2, on where the bank found the money",
      caveat: "averages of loans MADE; a term is a contract, not a life" },
    { id: "electric", label: "Electric light", group: "texture", band: "systems", domain: "The home's systems",
      home: "no chapter carries household electrification",
      caveat: "percent of dwellings; the column stops at 1956" },
    { id: "power", label: "Electricity used", group: "texture", band: "systems", domain: "The home's systems",
      home: "no chapter carries household electrification",
      caveat: "per customer, and the unit changes from a year to a month" },
    { id: "elecprice", label: "Electricity, a kilowatt-hour", group: "texture", band: "systems", domain: "The home’s systems",
      home: "II.3 owns the price level, not the price of a utility",
      caveat: "three instruments across the row, and no line between them" },
    { id: "bills", label: "The bills", group: "texture", band: "systems", domain: "The home’s systems",
      home: "no chapter carries the household’s utility bill",
      caveat: "what the house BURNED until 1990, what it PAID after" },
    { id: "household", label: "Who is in it, who earns", group: "core", band: "people",
      href: "../books/work/chapter-05.html", home: "IV.5, on who earns and the gap",
      caveat: "persons per occupied unit; the women’s basis shifts" },
    { id: "service", label: "In service", group: "texture", band: "people", domain: "Boarders, servants, and the household economy",
      home: "the charter names this domain as having no canonical home",
      caveat: "women in private household work, as a share of women at work" },
    { id: "transport", label: "Getting about", group: "core", band: "people",
      home: "no chapter carries the mechanism of household transport",
      caveat: "vehicles registered, not households owning one" },
    { id: "trucks", label: "Trucks on the register", group: "texture", band: "people", domain: "Geography and the commute",
      home: "no chapter carries the mechanism of household transport",
      caveat: "the classification breaks at the 2012 data year" },
    { id: "basket", label: "The basket", group: "core", band: "basket", priced: true,
      href: "../books/history/chapter-03.html", home: "II.3, on why the price level rises",
      caveat: "in the money of the day, and in hours of that year’s wage" }
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
      construct: "Occupations and households: decennial census, persons 14 and over (occupations) and occupied housing units (the home). Wages and hours: Douglas’s payroll-manufacturing series, an average, and before 1914 an extrapolation backward. Food: BLS retail prices in industrial localities, estimated from price relatives before 1915. No national home-value reading exists here or on 1915 because the 1900, 1910 and 1920 general schedules stopped at tenure and encumbrance; their special mortgage studies did not publish an all-owned-home national median. The 1930 population census did publish a median for owned nonfarm homes, on a third instrument and universe, and it appears only in the 1929 column. Nothing is estimated backward into either gap. Eras are chosen at documented breaks in the record, and every value is dated to the year the source prints, never to the year of the panel.",
      texture: [
        { lineId: "unemployment", reason: "the era’s own record of insecurity, from the same table that carries the 1933 figure, so the two can be read against each other" },
        { lineId: "service", reason: "the household as an employer of other households: this is the construct strip made flesh" },
        { lineId: "farmcity", reason: "in 1900 the tenure gap between farm and city is the housing story, and a single national ownership rate hides it" },
        { lineId: "electric", reason: "the arrival date of the invisible infrastructure, shown at the first year the series prints" },
        { lineId: "budget", reason: "the opening point of the only expenditure lineage that runs the whole century, and the one line on this panel that says whether the household made ends meet" },
        { lineId: "insurance", reason: "the survey's own category exists from the first wave, and it exists combined with healthcare — the construct is the finding as much as the figure is" }
      ],
      cells: {
        occupation: { a: cell("Farm work, 10,888 of 29,030 thousand, 37.5%", "hsus-d182", { year: 1900, note: "The census counts farmers and farm managers (5,763 thousand) apart from farm laborers and foremen (5,125); farmers and farm managers were the largest single major occupation group. Operatives, the largest group outside farming, numbered 3,720 thousand. Share computed from the table’s own rows." }) },
        hours: { a: cell("62.1 hours", "hsus-d769", { year: 1900, note: "Average weekly hours, payroll manufacturing industries. The widely quoted 59 hours is the same table's all-manufacturing total (D 765), which weights union scales in." }) },
        earnings: { a: cell("$487 a year", "hsus-d740", { year: 1900, note: "Average annual earnings per full-time employee in manufacturing. Per worker, not per household." }) },
        income: { a: cell("$749.50 average, urban wage-earner families, 1901", "bls-col1901", { year: 1901, note: "The Bureau of Labor's 1901 cost-of-living survey: 25,440 families of wage workers and salaried persons earning not more than $1,200, in the principal industrial centers of 33 states. An average, not a median, of that population only — farm families and business owners are outside it entirely, no survey measured the income of American families at large, and the Census median series begins in 1947." }) },
        home: { a: cell("46.7% owned", "hsus-n243", { year: 1900, note: "Owner-occupied as a percent of occupied units reporting tenure." }) },
        value: { a: cell("no national value collected", "census-pre1940-value-gap", { absent: true, note: "The 1900 general census inquiry stopped at whether the home was owned or rented and, if owned, whether it was mortgaged. The Census later wrote that the 1900 and 1910 inquiries ‘did not go beyond’ proprietorship and encumbrance because Congress did not provide for supplemental value data. The 1890 special study valued only encumbered owner-occupied farms and homes, not all owned homes. No national all-owned-home median pins to this panel, and none is reconstructed." }) },
        roof: { a: cell("$179 a year on housing, 1901", "bls-r991", { year: 1901, note: "The 1901 expenditure survey's housing category for the families it covered — urban wage workers and salaried people — averaging $179 of $769 spent, or 23.3 per cent. It is a spending average and NOT a rent: the Census median-gross-rent series does not begin until 1940, and no rent figure exists for this panel. The same report prints a home-ownership share for its own families that is far below the Census tenure figure shown above; the two count different populations and neither is a correction of the other." }) },
        household: { a: cell("4.8 people; 20.0% of women in the labor force", "hsus-n240", { year: 1900, srcs: ["hsus-d36", "census-ms2"], note: "Persons per occupied housing unit (N 240). The women's figure is the participation rate at the June 1900 census on a 14-and-over basis (D 36). Median age at first marriage: 25.9 for men, 21.9 for women (MS-2)." }) },
        transport: { a: cell("8 thousand motor cars registered", "hsus-q153", { year: 1900, note: "In the whole country." }) },
        basket: {
          a: {
            items: [
              { label: "a dozen eggs", price: 0.209, unit: "dozen", src: "hsus-e187", year: 1900 },
              { label: "half a gallon of milk, delivered", price: 0.136, unit: "half gallon", src: "hsus-e187", year: 1900 },
              { label: "a pound of butter", price: 0.261, unit: "pound", src: "hsus-e187", year: 1900 },
              { label: "a pound of round steak", price: 0.132, unit: "pound", src: "hsus-e187", year: 1900 },
              { label: "a pound of bread", price: null, unit: "pound", src: "hsus-e187", note: "The bread series begins in 1913; the Bureau computed no national average before then." },
              { label: "a gallon of gasoline", price: null, unit: "gallon", src: "eia-gas", note: "The retail gasoline series used here begins in 1949." },
              { label: "a first-class stamp", price: 0.02, unit: "letter", src: "usps-rates", year: 1900, note: "The rate had stood at 2 cents since 1885." }
            ]
          }
        },
        unemployment: { a: cell("5.0%", "hsus-d86", { year: 1900, note: "Percent of the civilian labor force, 14 and over on this basis." }) },
        electric: { a: cell("8.0% of dwellings, 1907", "hsus-s109", { year: 1907, srcs: ["hsus-s108"], note: "The series begins at 1902 with no figure and prints 1907 next; nothing is interpolated back to 1900. The record counted who had the wire before it counted what ran on it: the companion column for use per customer prints nothing at either year, as the line below says." }) },
        service: { a: cell("1,526 of 5,319 thousand women at work, 28.7%", "hsus-d182", { year: 1900, note: "Private household workers were the largest single occupation line among women in the experienced civilian labor force. Share computed from the table’s own two rows." }) },
        farmcity: { a: cell("Farm 64.4% owned, nonfarm 36.5%", "hsus-n243", { year: 1900, note: "The farm household owned; the city household rented." }) },
        budget: { a: cell("Food 42.5%, housing 23.3%, clothing 14.0% of $769 spent, 1901", "bls-r991", { year: 1901, note: "Shares of the average family's expenditures in the 1901 survey: food $327, housing $179, clothing $108, leaving $155 for everything else. Against those outgoings the same families averaged $750 of income — spending exceeded income by 2.5 per cent. Food, clothing and housing together took 79.8 per cent of what was spent. The population is the survey's own: families of urban wage workers and salaried people earning not more than $1,200." }) },
        insurance: { a: cell("Healthcare and insurance, $40 a year, 5.2%", "bls-r991", { year: 1901, srcs: ["ce-1710"], note: "The 1901 survey counts healthcare and insurance as one category and that is how it is printed here; from the 1934-36 wave onward the lineage prints healthcare alone, so the two ends of this line are not the same construct. At the other end, the 2024 Consumer Expenditure Survey puts health insurance at $4,055 a year and vehicle insurance at $1,993 for the average consumer unit. No continuous series joins those figures to this one." }) },
        power: { a: cell("the meter column is blank", "hsus-s108", { absent: true, note: "The use-per-customer column prints no figure at 1902 or at 1907, the two years the table carries on either side of this panel. Its first reading is 264 kilowatt-hours at 1912, which is the figure the next panel shows. Nothing is carried back into these years." }) },
        elecprice: { a: cell("16.2 cents a kilowatt-hour, 1902", "hsus-s116", { year: 1902, note: "The first figure this column prints, and the highest reading this column ever gives: it falls to 2.10 cents by 1970 in the money of the day. The price is not the bill, and this panel has no bill to set beside it — the meter column prints nothing at all until 1912." }) },
        bills: { a: cell("no fuel census yet", "census-coh-fuels", { absent: true, note: "What a house burned is a housing-census question and the census of housing begins in 1940. Nothing national records the fuel of a 1900 household, and no published bill reaches within forty years of this panel." }) },
        homesize: { a: cell("no floor-area series", "census-sqft", { absent: true, note: "The Census series for the floor area of new single-family houses begins in 1973. No national measurement of the size of an American house exists before it, and no earlier figure is printed as if one did." }) },
        saving: { a: cell("the national accounts do not reach", "bea-nipa21", { absent: true, note: "The national income and product accounts begin in 1929. Personal saving as a share of disposable income has no reading before that year; the 1929 panel carries the first one this page can show." }) },
        trucks: { a: cell("none on the register", "hsus-q155", { absent: true, note: "The truck column is blank at 1900 and at 1901, 1902 and 1903. Its first figure is 1904: seven hundred trucks in the whole country, against 54,500 automobiles. The blank is the finding — there was no fleet to count — and it is not read as a zero." }) },
        loan: { a: cell("no survey of mortgage terms", "fhfa-mirs", { absent: true, note: "The Federal Housing Finance Agency’s Monthly Interest Rate Survey, the only national measurement of mortgage terms this page uses, runs from 1963 to 2019. No rate, term or total for a house bought in 1900 exists in it, and none is constructed." }) }
      }
    },

    /* ------------------------------------------------------------ 1915 ---- */
    {
      id: "1915",
      label: "1915",
      title: "The industrial wage household",
      columns: [{ key: "a", label: "1915" }],
      construct: "Wages, hours and food are annual figures for 1915. Income and housing spending come from the nearest expenditure survey, 1918-19, and are printed with that date. Households, occupations and tenure are decennial, so the nearest census years are shown with their dates: there is no 1915 household size, no 1915 tenure rate and no 1915 median age at first marriage, and none is interpolated here.",
      texture: [
        { lineId: "unemployment", reason: "1915 carries the highest unemployment reading between 1900 and 1920 in this series" },
        { lineId: "electric", reason: "the light arrives in the cities first, and the series' own 1912 reading dates it" },
        { lineId: "power", reason: "the first year the use-per-customer column prints anything at all, which is what makes the 1900 panel's silence on it visible" },
        { lineId: "farmcity", reason: "the two censuses that bracket 1915 show the tenure gap holding" },
        { lineId: "budget", reason: "the wave that brackets this panel is the first in which most families ended the year in surplus, which the income line alone does not show" }
      ],
      cells: {
        occupation: { a: cell("Farm work, 11,533 of 37,291 thousand in 1910, 30.9%", "hsus-d182", { year: 1910, note: "By the January 1920 census, 11,390 of 42,206 thousand, 27.0%. Farmers and farm managers (6,163 thousand in 1910) were still the largest single major occupation group. Shares computed from the table’s own rows." }) },
        hours: { a: cell("58.2 hours", "hsus-d769", { year: 1915, note: "Average weekly hours, payroll manufacturing industries." }) },
        earnings: { a: cell("$661 a year", "hsus-d740", { year: 1915, srcs: ["nber-w2101"], note: "Average annual earnings per full-time employee in manufacturing. The era's famous pay datum is not in this series and is not a wage: on January 5, 1914, effective January 12, the Ford Motor Company announced a working day cut from 9 hours to 8 and minimum daily pay raised, in Raff and Summers's words, “from roughly $2.34 to $5.00 a day for those workers who were judged to qualify,” with the extra “labelled as profit sharing rather than wages.” Eligibility: men over 22, save for women and younger men supporting families; certification by a Sociological Department of 150 inspectors who visited workers' homes, a 1914 company pamphlet saying a worker joined the list of profit sharers only once the company “is satisfied that he will not debauch the additional money he receives”; and a six-month service requirement which the same authors' footnote dates not to the announcement but to the following autumn, after which it stayed. On how many collected, the paper reports figures that disagree: Ford's claim of all but 1 percent, against Lee's 1916 account of 69 percent within six months, 87 percent after a year and 90 percent by mid-1916, which the authors note appear to exclude workers with less than six months' service." }) },
        income: { a: cell("$1,518 average, expenditure-survey families, 1918-19", "bls-r991", { year: 1918, note: "Average income of the families covered by the 1918-19 expenditure survey, paired with this panel's housing and budget readings from the same wave. It is a mean for that survey population, not a national median and not a 1915 measurement; no figure is interpolated back to the panel year." }) },
        home: { a: cell("45.9% owned in 1910, 45.6% in 1920", "hsus-n243", { year: 1910, note: "No tenure figure exists for 1915. The rate had been falling slowly since 1890." }) },
        value: { a: cell("no national value collected", "census-pre1940-value-gap", { absent: true, note: "The 1910 general census inquiry stopped at proprietorship and encumbrance, and the 1920 general population schedule likewise asked only whether the home was owned or rented and, if owned, whether it was free or mortgaged. The 1920 mortgage monograph published values only for owned MORTGAGED nonfarm homes, not a national median for all owned homes. No qualifying figure pins to this panel, and none is reconstructed." }) },
        roof: { a: cell("$334 a year on housing, 1918-19", "bls-r991", { year: 1918, note: "The housing category of the 1918-19 expenditure wave, $334 of $1,434 spent — 23.3 per cent, the same share as 1901 though the money had nearly doubled. A spending average, not a rent: the Census gross-rent series still does not reach this panel." }) },
        household: { a: cell("4.5 people in 1910, 4.3 in 1920", "hsus-n240", { year: 1910, srcs: ["hsus-d36"], note: "Persons per occupied housing unit at the two bracketing censuses. Women's labor force participation is not printed for 1910 in this series; at the January 1920 census it was 22.7% on a 14-and-over basis." }) },
        transport: { a: cell("2,332 thousand motor cars registered", "hsus-q153", { year: 1915, note: "Up from 8 thousand in 1900." }) },
        basket: {
          a: {
            items: [
              { label: "a dozen eggs", price: 0.341, unit: "dozen", src: "hsus-e187", year: 1915 },
              { label: "half a gallon of milk, delivered", price: 0.178, unit: "half gallon", src: "hsus-e187", year: 1915 },
              { label: "a pound of butter", price: 0.358, unit: "pound", src: "hsus-e187", year: 1915 },
              { label: "a pound of round steak", price: 0.230, unit: "pound", src: "hsus-e187", year: 1915 },
              { label: "a pound of bread", price: 0.070, unit: "pound", src: "hsus-e187", year: 1915 },
              { label: "a gallon of gasoline", price: null, unit: "gallon", src: "eia-gas", note: "The retail gasoline series used here begins in 1949." },
              { label: "a first-class stamp", price: 0.02, unit: "letter", src: "usps-rates", year: 1915, note: "Still 2 cents; the 3-cent war rate arrives in November 1917." }
            ]
          }
        },
        unemployment: { a: cell("8.5%", "hsus-d86", { year: 1915, note: "The highest reading between 1900 and 1920 in this series." }) },
        electric: { a: cell("15.9% of dwellings, 1912", "hsus-s109", { year: 1912, note: "The series prints 1912 and then 1917 (24.3%); there is no 1915 figure." }) },
        power: { a: cell("264 kilowatt-hours a year, 1912", "hsus-s108", { year: 1912, note: "Per residential customer, and the first figure this column prints: 1902 and 1907 are blank in it." }) },
        farmcity: { a: cell("Farm 62.8% owned, nonfarm 38.4% in 1910", "hsus-n243", { year: 1910 }) },
        budget: { a: cell("Food 38.2%, housing 23.3% of $1,434 spent, 1918-19", "bls-r991", { year: 1918, note: "Food $549, housing $334, clothing $238 of $1,434. Income averaged $1,518, so unlike 1901 the average family spent less than it earned: the survey found 70.2 per cent ending the year in surplus, 23.7 per cent in deficit and 6.1 per cent breaking even. The wave's population is a cross-section of city consumers, not the 1901 survey's population." }) },
        elecprice: { a: cell("9.10 cents in 1912, 7.52 in 1917", "hsus-s116", { year: 1912, note: "Cents a kilowatt-hour, average price across all consumption. The table prints 1912 and then 1917, the same two years the service column beside it prints, and there is no 1915 figure. The price is falling fast in nominal money: it was 16.2 cents in 1902." }) },
        service: { a: cell("1,784 of 7,445 thousand women at work in 1910, 24.0%", "hsus-d182", { year: 1910, note: "Private household workers among women in the experienced civilian labor force. At the January 1920 census the same rows read 1,360 of 8,637 thousand, 15.7 per cent: the share falls by 8.3 points across the decade the war sits in, and then rises again at the next two censuses. Shares computed from the table’s own two rows." }) },
        trucks: { a: cell("159 thousand trucks registered", "hsus-q155", { year: 1915, note: "Against 2,332 thousand automobiles the same year: one truck for every fifteen cars. The column had printed nothing at all until 1904, when it read seven hundred." }) },
        bills: { a: cell("no fuel census yet", "census-coh-fuels", { absent: true, note: "The census of housing, which is where the heating-fuel question lives, begins in 1940. No national record says what the 1915 house burned." }) },
        homesize: { a: cell("no floor-area series", "census-sqft", { absent: true, note: "The Census series for the floor area of new single-family houses begins in 1973 and nothing precedes it." }) },
        saving: { a: cell("the national accounts do not reach", "bea-nipa21", { absent: true, note: "The national income and product accounts begin in 1929, fourteen years after this panel." }) },
        loan: { a: cell("no survey of mortgage terms", "fhfa-mirs", { absent: true, note: "The Monthly Interest Rate Survey runs from 1963 to 2019. Nothing national measures what a mortgage cost or how long it ran in 1915, and none is constructed." }) },
        insurance: { a: cell("no healthcare row in this wave", "bls-r991", { absent: true, note: "The 1918-19 expenditure wave that supplies this panel’s income, housing and budget lines has no healthcare or insurance category at all: Table 8 of the compilation lists food, apparel, housing — with rent, fuel and light, and furniture and furnishings beneath it — and miscellaneous, and nothing else. The absence is the finding; no figure is reconstructed from the wave either side of it." }) }
      }
    },

    /* --------------------------------------------------------- 1929-33 ---- */
    {
      id: "1929",
      label: "1929 → 1933",
      title: "The same ledger at boom and at bust",
      columns: [{ key: "a", label: "1929" }, { key: "b", label: "1933" }],
      construct: "One panel, two anchor years, with every source year printed. Rent and home value are from the 1930 census; the second occupation reading is from 1940; and the second income, housing and budget readings come from the 1934-36 expenditure survey. The unemployment rates are reconstructions rather than a contemporary count, and the ones shown are Stanley Lebergott’s as the Census prints them; other scholars who count relief workers as employed rather than unemployed put the 1933 figure lower. The hourly earnings and weekly hours for 1929 carry the Census’s own warning that, before 1932, earnings are likely overstated and hours understated.",
      texture: [
        { lineId: "unemployment", reason: "the panel exists for this line; it is the one number the two columns are read for" },
        { lineId: "electric", reason: "the light stayed on: a documented counter-current inside the collapse" },
        { lineId: "power", reason: "consumption per customer held up through the slump, which the ownership share alone would not show" },
        { lineId: "saving", reason: "the national accounts begin in 1929, and this panel's bust column is one of the only two years in which the saving rate they report is negative" },
        { lineId: "budget", reason: "the wave that follows the crash puts housing at the largest share of spending the whole lineage records, and counts how many families ended the year short" }
      ],
      cells: {
        occupation: {
          a: cell("Farm work, 10,321 of 48,686 thousand in 1930, 21.2%", "hsus-d182", { year: 1930, note: "Operatives were now the largest single major occupation group, at 7,691 thousand; the two farm groups together were larger still. Shares computed from the table’s own rows." }),
          b: cell("Operatives, 9,518 of 51,742 thousand in 1940, 18.4%", "hsus-d182", { year: 1940, note: "There is no 1933 occupation census. At the next census, in April 1940, operatives outnumbered the two farm groups together — 8,995 thousand, or 17.4 per cent — for the first time. Shares computed from the table's own rows." })
        },
        hours: {
          a: cell("44.2 hours", "hsus-d803", { year: 1929 }),
          b: cell("38.1 hours", "hsus-d803", { year: 1933 })
        },
        earnings: {
          a: cell("$1,543 a year; 56 cents an hour", "hsus-d740", { year: 1929, srcs: ["hsus-d802", "hsus-d804"], note: "Annual earnings per full-time employee in manufacturing (D 740); hourly earnings of production workers (D 802). Weekly earnings were $24.76 (D 804)." }),
          b: cell("$1,086 a year; 44 cents an hour", "hsus-d740", { year: 1933, srcs: ["hsus-d802", "hsus-d804"], note: "Weekly earnings were $16.65 (D 804)." })
        },
        income: {
          a: cell("$2,335 average per consumer unit, Goldsmith’s estimate", "hsus-g106", { year: 1929, note: "Family personal income per consumer unit — families and unattached individuals together, 36.1 million units — as estimated for 1929 by Selma Goldsmith adjusting the Brookings study, and reprinted by the Census. A mean, never a median; the construct includes nonmoney items such as imputed rent and farm food consumed, and it is not the money-income construct of the later panels. The Census prints that the 1929 estimates 'are less reliable than for other years in the series.'" }),
          b: cell("$1,524 average, expenditure-survey families, 1934-36", "bls-r991", { year: 1934, note: "Average income of the families covered by the 1934-36 expenditure survey, the same wave that supplies this column's housing and budget readings. It is a mean for that survey population, not the 1929 Goldsmith construct, not a national median and not a 1933 measurement." })
        },
        home: {
          a: cell("47.8% owned in 1930", "hsus-n243", { year: 1930, note: "The highest reading since 1890." }),
          b: cell("43.6% owned in 1940", "hsus-n243", { year: 1940, note: "By the next census the rate had fallen below every reading back to 1890." })
        },
        value: {
          a: cell("$4,779 at the 1930 census", "census-1930-families", { year: 1930, note: "Table 26 of the 1930 population census Families volume prints the median value of owned NONFARM homes, Total, All classes. The population schedule asked each nonfarm family returned as owning its home for the home's approximate current market value. This is a family-based population-census instrument and excludes farm homes; it is not the 1940-2000 housing-census series and the two are never joined. No work-time is shown because the value is a 1930 figure and this column’s wage is 1929’s." }),
          b: cell("$2,938 at the 1940 census", "census-coh-values", { year: 1940, note: "The first reading the series has, taken seven years after this column’s year — there is no 1933 figure and none is interpolated. The Bureau’s universe: owner-occupied single-family housing units on less than 10 acres without a business or medical office on the property. It is a value and not a sale. No work-time is shown for it: the value is a 1940 figure and the wage on this column is 1933’s, and this page never divides a price by another year’s wage." })
        },
        roof: {
          a: cell("$27.15 a month rent in 1930", "census-1930-families", { year: 1930, note: "Median monthly rental of rented NONFARM homes, Total, All classes, in Table 26 of the 1930 population census Families volume. Enumerators recorded the monthly rent, its monthly equivalent, or approximate rental value. This is not the post-1940 gross-rent series and does not include a separately estimated utility bill, so the two constructs are never joined." }),
          b: cell("$485 a year on housing, 1934-36", "bls-r991", { year: 1934, note: "The housing category of the 1934-36 wave, $485 of $1,512 spent. At 32.0 per cent that is the largest share housing takes in the whole 1901-to-2002 lineage — larger than 1950, larger than 1972-73, larger than 1996-97. A spending average, not a rent." })
        },
        household: {
          a: cell("4.1 people in 1930; 23.6% of women in the labor force", "hsus-n240", { year: 1930, srcs: ["hsus-d36", "census-ms2"], note: "Persons per occupied housing unit; women's participation at the April 1930 census, 14 and over. Median age at first marriage in 1930: 24.3 for men, 21.3 for women." }),
          b: cell("3.8 people in 1940; 25.8% of women in the labor force", "hsus-n240", { year: 1940, srcs: ["hsus-d36"], note: "Both at the April 1940 census." })
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
              { label: "a pound of bread", price: 0.088, unit: "pound", src: "hsus-e187", year: 1929 },
              { label: "a gallon of gasoline", price: null, unit: "gallon", src: "eia-gas", note: "The retail gasoline series used here begins in 1949." },
              { label: "a first-class stamp", price: 0.02, unit: "letter", src: "usps-rates", year: 1929, note: "Still 2 cents." }
            ]
          },
          b: {
            items: [
              { label: "a dozen eggs", price: 0.288, unit: "dozen", src: "hsus-e187", year: 1933 },
              { label: "half a gallon of milk, delivered", price: 0.214, unit: "half gallon", src: "hsus-e187", year: 1933 },
              { label: "a pound of butter", price: 0.278, unit: "pound", src: "hsus-e187", year: 1933 },
              { label: "a pound of round steak", price: 0.257, unit: "pound", src: "hsus-e187", year: 1933 },
              { label: "a pound of bread", price: 0.071, unit: "pound", src: "hsus-e187", year: 1933 },
              { label: "a gallon of gasoline", price: null, unit: "gallon", src: "eia-gas", note: "The retail gasoline series used here begins in 1949." },
              { label: "a first-class stamp", price: 0.03, unit: "letter", src: "usps-rates", year: 1933, note: "3 cents from 6 July 1932." }
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
          a: cell("502 kilowatt-hours a year", "hsus-s108", { year: 1929, srcs: ["hsus-s116"], note: "Per residential customer; the price was 6.33 cents a kilowatt-hour." }),
          b: cell("600 kilowatt-hours a year", "hsus-s108", { year: 1933, srcs: ["hsus-s116"], note: "Use per customer was higher in every year of the slump than in 1929; the price fell to 5.52 cents." })
        },
        saving: {
          a: cell("4.7% of disposable income", "bea-nipa21", { year: 1929, note: "Personal saving as a percentage of disposable personal income, the first year the national accounts reach." }),
          b: cell("−0.7% of disposable income", "bea-nipa21", { year: 1933, note: "1932 and 1933, at −0.2 and −0.7 percent, are the only years in the whole series, 1929 to 2025, in which the figure is negative: the sector spent more than its disposable income. The measure is an accounting residual for households and the nonprofits serving them, not a survey of what families set aside." })
        },
        budget: {
          a: cell("no expenditure-survey wave, 1918-33", "bls-r991", { absent: true, note: "The Bureau's expenditure lineage jumps from 1918-19 to 1934-36. No 1929 household-budget wave exists in it, and no category shares are reconstructed." }),
          b: cell("Food 33.6%, housing 32.0% of $1,512 spent, 1934-36", "bls-r991", { year: 1934, note: "Food $508, housing $485, clothing $160. Income averaged $1,524 against $1,512 spent. The survey counted how the years had gone: 59.2 per cent of families ended with a surplus averaging $149, 37.8 per cent with a deficit averaging $203, and 3.0 per cent broke even. Food and housing are within two points of each other here for the first time in the lineage." })
        },
        elecprice: {
          a: cell("6.33 cents a kilowatt-hour", "hsus-s116", { year: 1929, note: "Average price across all consumption, down from 16.2 cents in 1902." }),
          b: cell("5.52 cents a kilowatt-hour", "hsus-s116", { year: 1933, note: "The price fell in every year of the slump and use per customer was higher in every one of them than in 1929. Neither column turns with the collapse." })
        },
        service: {
          a: cell("1,909 of 10,752 thousand women at work in 1930, 17.8%", "hsus-d182", { year: 1930, note: "Private household workers among women in the experienced civilian labor force. The share had fallen to 15.7 per cent at 1920 and rises again here. Shares computed from the table’s own two rows." }),
          b: cell("2,277 of 12,574 thousand women at work in 1940, 18.1%", "hsus-d182", { year: 1940, note: "There is no 1933 occupation census. At the April 1940 census the count of women in private household work reached its highest figure anywhere in this column — more women were in service at the end of the slump than at any census before or after it." })
        },
        farmcity: {
          a: cell("Farm 53.9% owned, nonfarm 46.0% in 1930", "hsus-n243", { year: 1930, note: "The gap between the two had been 27.9 points in 1900; at this census it is 7.9. The farm-nonfarm breakdown does not add to the total, on the table’s own note." }),
          b: cell("Farm 53.2% owned, nonfarm 41.1% in 1940", "hsus-n243", { year: 1940, note: "Both sides fell across the decade and the city side fell further — 4.9 points against the farm side’s 0.7 — which is the only decade in the table where that happens." })
        },
        trucks: {
          a: cell("3,550 thousand trucks registered", "hsus-q155", { year: 1929, note: "Against 23,121 thousand automobiles." }),
          b: cell("3,457 thousand trucks registered", "hsus-q155", { year: 1933, note: "The truck column fell by 2.6 per cent across the slump; the automobile column beside it fell by 10.7." })
        },
        insurance: {
          a: cell("no expenditure-survey wave, 1918-33", "bls-r991", { absent: true, note: "The same gap that leaves this column without budget shares leaves it without a healthcare figure. The lineage jumps from 1918-19, which has no healthcare row at all, to 1934-36, which has one." }),
          b: cell("Healthcare, $59 a year, 3.9%", "bls-r991", { year: 1934, note: "The first healthcare figure the lineage prints. The 1901 wave counted healthcare and insurance together at $40 and 5.2 per cent; this wave counts healthcare alone, so the fall in the share is partly a relabel and not only a change in what families bought. The two are not the same category and no arrow is drawn between them." })
        },
        bills: {
          a: cell("no fuel census yet", "census-coh-fuels", { absent: true, note: "The census of housing begins in 1940. The first reading of what an American house burned sits on the 1944 panel and nothing reaches back to either of these columns." }),
          b: cell("no fuel census yet", "census-coh-fuels", { absent: true, note: "The 1940 census is seven years after this column’s year. Its fuel figures are shown where they belong, on the 1944 panel, and are not pulled back here." })
        },
        homesize: {
          a: cell("no floor-area series", "census-sqft", { absent: true, note: "The Census floor-area series for new single-family houses begins in 1973." }),
          b: cell("no floor-area series", "census-sqft", { absent: true, note: "The Census floor-area series for new single-family houses begins in 1973." })
        },
        loan: {
          a: cell("no survey of mortgage terms", "fhfa-mirs", { absent: true, note: "The Monthly Interest Rate Survey runs 1963 to 2019. Nothing national measured the rate, term or size of an American mortgage in this column’s year, and this page prints no figure it cannot pin." }),
          b: cell("no survey of mortgage terms", "fhfa-mirs", { absent: true, note: "The federal lending machinery built in and after this column’s year produced no national average of rate, term and loan size of the kind this line shows from 1965 on. The survey that does begins in 1963, thirty years later, and nothing is carried back." })
        }
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
        { lineId: "power", reason: "use per customer nearly doubled between 1933 and 1944 while the price kept falling" },
        { lineId: "saving", reason: "the highest reading the series carries" },
        { lineId: "bills", reason: "the first census that asked what the house burned, and the answer is a fuel no household buys today" }
      ],
      cells: {
        occupation: { a: cell("Operatives, 9,518 of 51,742 thousand in 1940, 18.4%", "hsus-d182", { year: 1940, note: "At the April 1940 census operatives outnumbered the two farm groups together (8,995 thousand, 17.4%) for the first time. Shares computed from the table’s own rows." }) },
        hours: { a: cell("45.2 hours", "hsus-d803", { year: 1944, note: "The highest reading in this series between 1929 and 1970." }) },
        earnings: { a: cell("$2,517 a year; $1.01 an hour", "hsus-d740", { year: 1944, srcs: ["hsus-d802", "hsus-d804"], note: "The annual figure is identical in 1944, 1945 and 1946 — $2,517 in each year. Weekly earnings were $45.70." }) },
        income: { a: cell("city families and single persons: $2,700 median, after taxes", "bls-mlr1946", { year: 1944, note: "A Bureau of Labor Statistics survey of some 1,700 city consumers in 102 urban communities measured 1944 incomes: half of families and single persons had net incomes after personal taxes below $2,700, against $1,900 in 1941. After-tax, urban only, and with single persons counted — not the Census pre-tax family construct, whose median series begins in 1947 at $3,031." }) },
        home: { a: cell("43.6% owned in 1940; 53.2% at a November 1945 sample survey", "hsus-n243", { year: 1940, note: "The Census marks the 1945 figure as based on a sample survey and not comparable with the census years." }) },
        value: { a: cell("$2,938 at the 1940 census", "census-coh-values", { year: 1940, note: "The first housing census, four years before this panel’s year, and the same census the tenure line above is read at. The Bureau’s universe: owner-occupied single-family housing units on less than 10 acres without a business or medical office on the property. It is a value and not a sale. No work-time is shown: the value is a 1940 figure against a 1944 wage, and this page never divides a price by another year’s wage." }) },
        roof: { a: cell("$27 a month rent in 1940, $42 in 1950", "census-coh-rent", { year: 1940, note: "Median gross rent at the two censuses that bracket this panel; there is no 1944 figure and none is interpolated. GROSS rent is rent plus the estimated average monthly cost of utilities and fuels, so it already contains the fuel and bill readings on the lines further down and the two are never added together. 1940 is the first housing census, which is why this is the earliest rent on the page. No owner-cost counterpart exists at these censuses: the record measured what renters paid for decades before it measured what owners paid." }) },
        household: { a: cell("3.8 people in 1940; 36.3% of women in the labor force", "hsus-n240", { year: 1940, srcs: ["hsus-d36"], note: "Persons per occupied housing unit at the 1940 census. The women's figure is the 1944 annual average on a 14-and-over basis, and it is the highest reading of the war." }) },
        transport: { a: cell("25,566 thousand motor cars registered", "hsus-q153", { year: 1944, note: "Fewer than in 1941. Factory sales of passenger cars in 1944 were 600 vehicles." }) },
        basket: {
          a: {
            items: [
              { label: "a dozen eggs", price: 0.545, unit: "dozen", src: "hsus-e187", year: 1944 },
              { label: "half a gallon of milk, delivered", price: 0.312, unit: "half gallon", src: "hsus-e187", year: 1944 },
              { label: "a pound of butter", price: 0.500, unit: "pound", src: "hsus-e187", year: 1944 },
              { label: "a pound of round steak", price: 0.414, unit: "pound", src: "hsus-e187", year: 1944 },
              { label: "a pound of bread", price: 0.088, unit: "pound", src: "hsus-e187", year: 1944 },
              { label: "a gallon of gasoline", price: null, unit: "gallon", src: "eia-gas", note: "The retail gasoline series used here begins in 1949." },
              { label: "a first-class stamp", price: 0.03, unit: "letter", src: "usps-rates", year: 1944, note: "Still 3 cents." }
            ]
          }
        },
        unemployment: { a: cell("1.2%", "hsus-d86", { year: 1944, note: "670 thousand people. The lowest reading in the series, which runs from 1890 to 1970." }) },
        electric: { a: cell("84.0% of dwellings; farm 42.2%", "hsus-s109", { year: 1944, note: "The farm share had been 9.2% in 1929." }) },
        power: { a: cell("1,151 kilowatt-hours a year", "hsus-s108", { year: 1944, srcs: ["hsus-s116"], note: "Per residential customer; the price was 3.51 cents a kilowatt-hour." }) },
        saving: { a: cell("27.9% of disposable income", "bea-nipa21", { year: 1944, note: "The highest annual reading in the series, which runs from 1929 to 2025; 1943 reads 27.7 and 1942 26.2. The measure is an accounting residual for households and the nonprofits serving them, not a survey of what families set aside." }) },
        bills: { a: cell("Coal or coke heated 54.7% of homes in 1940; wood 22.8%", "census-coh-fuels", { year: 1940, note: "Of 33,884,379 occupied units reporting heating fuel at the 1940 census: coal or coke 54.7 per cent, wood 22.8, utility gas 11.3, fuel oil and kerosene 10.0. Electricity and bottled gas read NA — the census did not carry those columns in 1940, which is not the same as their being zero. This is what the house burned, not what it paid: no published bill reaches this panel, and the rent line above already contains the utilities, so nothing here is ever added to it." }) },
        elecprice: { a: cell("3.51 cents a kilowatt-hour", "hsus-s116", { year: 1944, note: "Average price across all consumption, against 6.33 cents in 1929. The price has fallen by nearly half in fifteen years while use per customer has more than doubled." }) },
        service: { a: cell("2,277 of 12,574 thousand women at work in 1940, 18.1%", "hsus-d182", { year: 1940, note: "Private household workers among women in the experienced civilian labor force, at the census before this panel. By the 1950 census the same rows read 1,459 of 16,445 thousand, 8.9 per cent: the share halves across the decade the war sits in, and the count falls by eight hundred thousand while the number of women at work rises by nearly four million. Shares computed from the table’s own two rows." }) },
        farmcity: { a: cell("Farm 53.2% owned, nonfarm 41.1% in 1940", "hsus-n243", { year: 1940, note: "At the November 1945 sample survey the same columns read farm 65.4 per cent and nonfarm 50.8; the Census marks that survey as not comparable with the census years, the same caveat the tenure line above carries. The farm-nonfarm breakdown does not add to the total, on the table’s own note." }) },
        trucks: { a: cell("4,760 thousand trucks registered", "hsus-q155", { year: 1944, note: "Against 25,566 thousand automobiles. Factory sales of passenger cars in 1944 were 600 vehicles; sales of trucks and buses were 737,500." }) },
        budget: { a: cell("no wartime wave in the lineage", "bls-r991", { absent: true, note: "The Bureau’s expenditure lineage runs 1901, 1918-19, 1934-36, 1950, 1960-61, 1972-73 and on. It has no wartime wave. The household that spent under rationing, price control and forced saving is the one household of the century whose budget this series does not divide up, and nothing is interpolated across the gap." }) },
        insurance: { a: cell("no wave between 1934-36 and 1950", "bls-r991", { absent: true, note: "The same gap that leaves this panel without budget shares leaves it without a healthcare figure. The wave before reads $59 a year and the wave after $197; neither is carried to this panel." }) },
        homesize: { a: cell("no floor-area series", "census-sqft", { absent: true, note: "The Census floor-area series for new single-family houses begins in 1973. Private house-building had all but stopped in this year in any case, but the absence here is the record’s, not the war’s." }) },
        loan: { a: cell("no survey of mortgage terms", "fhfa-mirs", { absent: true, note: "The Monthly Interest Rate Survey runs 1963 to 2019. No national survey averaged the rate, term and size of American mortgages until 1963, nineteen years after this panel, and nothing is carried back to it." }) }
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
        { lineId: "power", reason: "the appliances arrive as kilowatt-hours before they arrive as a list of objects" },
        { lineId: "service", reason: "the occupation that employed more than a quarter of working women in 1900, at what it had come to by the anchor year" },
        { lineId: "saving", reason: "the anchor year's own figure, on a line the panels either side of it also carry" },
        { lineId: "budget", reason: "the anchor year is the one a reader arrives with a claim about, and the budget line is where the claim is answerable: what share of the money the necessities actually took" }
      ],
      cells: {
        occupation: { a: cell("Operatives, 12,080 of 58,999 thousand in 1950, 20.5%", "hsus-d182", { year: 1950, note: "The largest major group at both censuses that bracket 1955; at 1960, 11,754 of 67,990 thousand, 17.3%. Farmworkers were 11.8% in 1950 and 6.0% in 1960. Shares computed from the table’s own rows." }) },
        hours: { a: cell("40.7 hours", "hsus-d803", { year: 1955 }) },
        earnings: { a: cell("$4,356 a year; $1.86 an hour", "hsus-d740", { year: 1955, srcs: ["hsus-d802", "hsus-d804"], note: "Annual earnings per full-time employee in manufacturing; weekly earnings were $75.70." }) },
        income: { a: cell("$4,418 median, $4,962 mean", "census-f5", { year: 1955, note: "Median and mean money income of the 42,890 thousand families counted that year. The mean sits above the median because income is not distributed symmetrically; both are printed here for that reason." }) },
        home: { a: cell("55.0% owned in 1950, 61.9% in 1960; houses started: 1,170 sq ft average, $13,700 median proposed price", "hsus-n243", { year: 1950, srcs: ["bls-b1231"], note: "Tenure: the largest decade-on-decade rise in the series is 1940 to 1950. A December 1956 sample survey reads 60.4%, marked by the Census as not comparable with census years. The house itself: a Bureau of Labor Statistics survey of new privately owned nonfarm 1-family houses started in the first three months of 1955 reports an average floor area of 1,170 square feet and a median proposed selling price of $13,700 — at that year's manufacturing hourly earnings, about 7,366 hours of work. That survey is not the Census series the later panels stand on: it prices houses when building starts rather than when they sell, its floor area is a mean rather than a median, and neither the Census sales-price series (which begins in 1963) nor the Census floor-area series (which begins in 1973) reaches 1955. No line on this page is drawn between the two." }) },
        value: { a: cell("$7,354 in 1950, $11,900 in 1960", "census-coh-values", { year: 1950, note: "The censuses that bracket this panel, on the same pair of years the tenure line above uses. The Bureau’s universe: owner-occupied single-family housing units on less than 10 acres without a business or medical office on the property — the homes already standing and lived in, which is not the $13,700 on the home line above. That figure is a median PROPOSED selling price of new houses started in the first quarter of 1955, from a Bureau of Labor Statistics survey, and it is not a point on this series. No work-time is shown: neither census year is this panel’s wage year." }) },
        roof: { a: cell("$42 a month rent in 1950, $71 in 1960", "census-coh-rent", { year: 1950, note: "Median gross rent at the two censuses that bracket the anchor year — rent plus the estimated average monthly cost of utilities and fuels, so the bill is inside it. There is no 1955 figure and none is interpolated, and the censuses of these years carry no owner-cost counterpart: no owner-cost counterpart appears on this page until 2005." }) },
        household: { a: cell("3.5 people in 1950, 3.4 in 1960; 35.7% of women in the labor force", "hsus-n240", { year: 1950, srcs: ["cps-flfp", "hsus-d36", "census-ms2"], note: "Persons per occupied housing unit at the bracketing censuses. The women's figure is the 1955 annual average, 16 and over, and it is below the 36.3% of 1944 on a 14-and-over basis; the series does not pass the wartime reading again until 1956. Median age at first marriage in 1955: 22.6 for men, 20.2 for women, close to the lowest the series records." }) },
        transport: { a: cell("52,145 thousand motor cars registered", "hsus-q153", { year: 1955, note: "Twice the 1944 count." }) },
        basket: {
          a: {
            items: [
              { label: "a dozen eggs", price: 0.606, unit: "dozen", src: "hsus-e187", year: 1955 },
              { label: "half a gallon of milk, delivered", price: 0.462, unit: "half gallon", src: "hsus-e187", year: 1955 },
              { label: "a pound of butter", price: 0.709, unit: "pound", src: "hsus-e187", year: 1955 },
              { label: "a pound of round steak", price: 0.903, unit: "pound", src: "hsus-e187", year: 1955 },
              { label: "a pound of bread", price: 0.177, unit: "pound", src: "hsus-e187", year: 1955 },
              { label: "a gallon of gasoline, leaded regular", price: 0.291, unit: "gallon", src: "eia-gas", year: 1955 },
              { label: "a first-class stamp", price: 0.03, unit: "letter", src: "usps-rates", year: 1955, note: "Still 3 cents, where it had been since 1932." }
            ]
          }
        },
        unemployment: { a: cell("4.4%", "hsus-d86", { year: 1955, note: "2,852 thousand people." }) },
        electric: { a: cell("98.4% of dwellings; farm 94.4%", "hsus-s109", { year: 1955, note: "Urban and rural nonfarm dwellings were at 98.8%." }) },
        power: { a: cell("2,773 kilowatt-hours a year", "hsus-s108", { year: 1955, srcs: ["hsus-s116"], note: "Per residential customer, against 1,151 in 1944; the price was 2.65 cents a kilowatt-hour." }) },
        service: { a: cell("1,459 of 16,445 thousand women at work in 1950, 8.9%", "hsus-d182", { year: 1950, note: "Private household workers, down from 28.7% of women at work in 1900. Clerical work is the largest female line by 1950, at 4,502 thousand. Shares computed from the table’s own rows." }) },
        saving: { a: cell("9.7% of disposable income", "bea-nipa21", { year: 1955, note: "Personal saving as a percentage of disposable personal income: an accounting residual for households and the nonprofits serving them, not a survey of what families set aside." }) },
        budget: { a: cell("Food 29.7%, housing 27.2% of $3,808 spent, 1950", "bls-r991", { year: 1950, note: "Food $1,130, housing $1,035, clothing $437, transportation $510, healthcare $197. Income averaged $4,237 against $3,808 spent. Food is still the largest single category here and housing has not yet passed it; on this lineage that happens at the next wave. Shares are of the average family's spending, and the wave's population is all urban and rural families, not the wage-earner families of 1901." }) },
        elecprice: { a: cell("2.65 cents a kilowatt-hour", "hsus-s116", { year: 1955, note: "Average price across all consumption. It has fallen in every panel year since 1902, when it read 16.2 cents; over the same span use per customer has gone from nothing measurable to 2,773 kilowatt-hours a year." }) },
        farmcity: { a: cell("Farm 65.7% owned, nonfarm 53.4% in 1950", "hsus-n243", { year: 1950, note: "Both sides rise more across the 1940s than in any other decade the table covers — the city side by 12.3 points. The farm-nonfarm breakdown does not add to the total, on the table’s own note, and the 1950 rural-farm classification differs slightly from the 1940 one." }) },
        trucks: { a: cell("10,289 thousand trucks registered", "hsus-q155", { year: 1955, note: "Against 52,145 thousand automobiles: one truck for every five cars, where in 1915 it was one for every fifteen." }) },
        bills: { a: cell("Coal or coke heated 34.6% of homes in 1950; utility gas 26.6%", "census-coh-fuels", { year: 1950, note: "Of 41,828,850 occupied units at the 1950 census: coal or coke 34.6 per cent, utility gas 26.6, fuel oil and kerosene 22.6, wood 10.0, bottled or tank gas 2.3, electricity 0.7. Coal has lost twenty points in a decade and is still the largest single fuel. This is what the house burned; no published bill reaches this panel, and the rent line above already contains the utilities." }) },
        insurance: { a: cell("Healthcare, $197 a year, 5.2%", "bls-r991", { year: 1950, note: "The 1950 wave of the same lineage, which prints healthcare alone rather than the 1901 wave’s combined healthcare-and-insurance category. In share terms $197 of $3,808 spent is the same 5.2 per cent that $40 of $769 was in 1901 — the same fraction of a budget nearly five times larger, and a narrower category." }) },
        homesize: { a: cell("no floor-area series", "census-sqft", { absent: true, note: "The Census series for the floor area of new single-family houses begins in 1973. The 1,170-square-foot average on the home line above comes from a Bureau of Labor Statistics survey of houses STARTED in the first quarter of 1955 — a mean, not a median, and a different instrument. No line is drawn between the two, and this row stays empty rather than borrowing that figure." }) },
        loan: { a: cell("no survey of mortgage terms", "fhfa-mirs", { absent: true, note: "The Monthly Interest Rate Survey begins in 1963, eight years after this panel. The first national average of what mortgages actually ran — 22.6 years — sits on the 1965 panel, and nothing is carried back to this one." }) }
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
        { lineId: "service", reason: "the female occupation the century moved women into, against the one it moved them out of" },
        { lineId: "saving", reason: "the rate rose across the decade between this panel and 1955" },
        { lineId: "loan", reason: "the first panel the mortgage survey reaches, and the shortest average term the page carries — the thirty-year loan is not yet what the average borrower signed" },
        { lineId: "budget", reason: "the wave at which housing passes food as the largest thing a household buys, which the lineage's own compilation names as the moment" }
      ],
      cells: {
        occupation: { a: cell("Operatives, 11,754 of 67,990 thousand in 1960, 17.3%", "hsus-d182", { year: 1960, note: "The largest major group at the 1960 census; farmworkers were 6.0%. Shares computed from the table’s own rows." }) },
        hours: { a: cell("41.2 hours", "hsus-d803", { year: 1965 }) },
        earnings: { a: cell("$6,389 a year; $2.61 an hour", "hsus-d740", { year: 1965, srcs: ["hsus-d802", "hsus-d804"], note: "Annual earnings per full-time employee in manufacturing; weekly earnings were $107.53." }) },
        income: { a: cell("$6,957 median, $7,704 mean", "census-f5", { year: 1965, note: "Money income of the 48,510 thousand families counted that year." }) },
        home: { a: cell("61.9% owned in 1960, 62.9% in 1970; a new house sold for $20,000", "hsus-n243", { year: 1960, srcs: ["census-nrs"], note: "The rise of the 1940s and 1950s does not repeat in the 1960s. The new-home sales-price series begins in 1963, at a median of $18,000; the 1965 median is $20,000 and the average $21,500. At the year’s manufacturing hourly earnings that median is about 7,663 hours of work." }) },
        value: { a: cell("$11,900 in 1960, $17,000 in 1970", "census-coh-values", { year: 1960, note: "The bracketing censuses, the same pair the tenure line above is read at. The Bureau’s universe: owner-occupied single-family housing units on less than 10 acres without a business or medical office on the property. This is the stock of homes people were living in; the $20,000 on the home line above is the median price of a NEW house sold in 1965, a different universe, and the distance between the two figures is not a rise. No work-time is shown: neither census year is this panel’s wage year." }) },
        roof: { a: cell("$71 a month rent in 1960, $108 in 1970", "census-coh-rent", { year: 1960, note: "Median gross rent at the bracketing censuses — rent plus the estimated average monthly cost of utilities and fuels. No owner-cost counterpart is measured at these censuses." }) },
        household: { a: cell("3.4 people in 1960, 3.2 in 1970; 39.3% of women in the labor force", "hsus-n240", { year: 1960, srcs: ["cps-flfp", "census-ms2"], note: "Persons per occupied housing unit at the bracketing censuses. The women's figure is the 1965 annual average, 16 and over. Median age at first marriage in 1965: 22.8 for men, 20.6 for women." }) },
        transport: { a: cell("75,258 thousand motor cars registered", "hsus-q153", { year: 1965 }) },
        basket: {
          a: {
            items: [
              { label: "a dozen eggs", price: 0.527, unit: "dozen", src: "hsus-e187", year: 1965 },
              { label: "half a gallon of milk, delivered", price: 0.526, unit: "half gallon", src: "hsus-e187", year: 1965 },
              { label: "a pound of butter", price: 0.754, unit: "pound", src: "hsus-e187", year: 1965 },
              { label: "a pound of round steak", price: 1.084, unit: "pound", src: "hsus-e187", year: 1965 },
              { label: "a pound of bread", price: 0.209, unit: "pound", src: "hsus-e187", year: 1965 },
              { label: "a gallon of gasoline, leaded regular", price: 0.312, unit: "gallon", src: "eia-gas", year: 1965 },
              { label: "a first-class stamp", price: 0.05, unit: "letter", src: "usps-rates", year: 1965, note: "5 cents from 7 January 1963." }
            ]
          }
        },
        unemployment: { a: cell("4.5%", "hsus-d86", { year: 1965, note: "3,366 thousand people, against 4.4% and 2,852 thousand in 1955." }) },
        power: { a: cell("4,933 kilowatt-hours a year", "hsus-s108", { year: 1965, srcs: ["hsus-s116", "hsus-s109"], note: "Per residential customer, against 2,773 in 1955 and 264 at the column’s first reading in 1912. The meter is what is left to measure once nearly every dwelling has the service, which is why the line above it stops and this one does not." }) },
        service: { a: cell("1,760 of 22,304 thousand women at work in 1960, 7.9%", "hsus-d182", { year: 1960, note: "Private household workers. Clerical workers were 6,497 thousand, 29.1% of women at work, and the largest female line by a wide margin. Shares computed from the table’s own rows." }) },
        saving: { a: cell("11.5% of disposable income", "bea-nipa21", { year: 1965, note: "Against 9.7% in 1955. An accounting residual for households and the nonprofits serving them, not a survey of what families set aside." }) },
        loan: { a: cell("$109 a month for 22.6 years; $16,400 repaid as $29,545", "fhfa-mirs", { year: 1965, note: "Averages on conventional single-family mortgages closed in 1965: contract rate 5.83 per cent, term to maturity 22.6 years, loan $16,400 against a purchase price of $22,500, a loan-to-price ratio of 73.0 per cent. Amortised at that rate and term, principal and interest are $109 a month and $29,545 in all, including $13,145 of interest; counting the money paid down at the start brings the total to $35,645. The payment and repayment figures are this page's arithmetic on the survey's own averages, exclude taxes, insurance, utilities and fees, and assume the loan runs its full term. Mortgages are commonly ended early by sale or refinancing, so the term is the length of the contract, not a measured life." }) },
        budget: { a: cell("Housing 29.5%, food 24.3% of $5,390 spent, 1960-61", "bls-r991", { year: 1960, note: "Housing $1,588, food $1,311, transportation $793, clothing $558, healthcare $355. Income averaged $6,691 against $5,390 spent. This is the wave at which housing overtakes food: the lineage's own compilation says that in the 1960s spending for housing became the most significant item in household budgets, displacing spending on food. It has been the largest category at every wave since." }) },
        electric: { a: cell("the column ends at 1956, at 98.8%", "hsus-s109", { absent: true, year: 1956, note: "The percentage-of-dwellings columns print their last figure at 1956 — 98.8 per cent of all dwellings, 95.9 per cent of farm dwellings — and then run as dashes to the table’s end in 1970. The question stopped being worth a column, which is itself the finding; no later national reading of this construct is printed here, and the 98.8 is not carried forward as if it still held." }) },
        elecprice: { a: cell("2.25 cents a kilowatt-hour", "hsus-s116", { year: 1965, note: "Average price across all consumption. It has fallen at every panel since 1902 and falls once more, to 2.10 cents at 1970, before this column ends. The next reading this page carries after that, twenty years on and on another instrument, is 8.5 cents." }) },
        farmcity: { a: cell("Farm 73.8% owned, nonfarm 61.0% in 1960", "hsus-n243", { year: 1960, note: "The farm household has out-owned the city household at every census in this table, and the gap is 12.8 points here against 27.9 in 1900. The breakdown does not add to the total, on the table’s own note." }) },
        trucks: { a: cell("14,786 thousand trucks registered", "hsus-q155", { year: 1965, note: "Against 75,258 thousand automobiles. This is the last reading this column gives: the series ends at 1970 and the later panels count trucks from the Federal Highway Administration’s own annual volumes instead." }) },
        bills: { a: cell("Utility gas heated 43.1% of homes in 1960; fuel oil 32.4%", "census-coh-fuels", { year: 1960, note: "Of 53,022,057 occupied units at the 1960 census: utility gas 43.1 per cent, fuel oil and kerosene 32.4, coal or coke 12.2, bottled or tank gas 5.1, wood 4.2, electricity 1.8. Fuel oil peaks here — a third of American homes burned oil in 1960, which the story of oil heat as an old-fashioned thing gets backwards. This is what the house burned; no published bill reaches this panel." }) },
        insurance: { a: cell("Healthcare, $355 a year, 6.6%", "bls-r991", { year: 1960, note: "The 1960-61 wave. The share has risen at every wave since 1934-36 — 3.9, then 5.2, now 6.6 per cent — and this is still healthcare as one undivided category, not a premium. The survey does not separate what was paid to an insurer from what was paid to a doctor until the modern releases." }) },
        homesize: { a: cell("no floor-area series", "census-sqft", { absent: true, note: "The Census series for the floor area of new single-family houses begins in 1973. The home line above carries a sales price for a new house from 1963 onward, but not a size: the Bureau priced the house eight years before it measured it." }) }
      }
    },

    /* ------------------------------------------------------------ 1973 ---- */
    {
      id: "1973",
      label: "1973",
      title: "The inflection",
      columns: [{ key: "a", label: "1973" }],
      construct: "The wage and hours lines change instrument here. From 1973 they cover production and nonsupervisory employees across ALL private industry rather than manufacturing alone, because manufacturing is a shrinking share of the payroll across these panels; the join and the years where both series exist are set out in the method note. The income line also changes universe: from here it counts HOUSEHOLDS, everyone occupying a housing unit, which is wider than the FAMILIES counted in 1955 and 1965. Both are printed for 1973 so the gap between the two constructs is visible rather than assumed.",
      texture: [
        { lineId: "unemployment", reason: "the modern survey measures directly what the earlier panels could only reconstruct" },
        { lineId: "homesize", reason: "the Census floor-area series begins in 1973, so this is the first panel whose house size sits on the series the later panels use; the 1955 panel's figure comes from a different survey and is never joined to it" },
        { lineId: "trucks", reason: "the vehicle a household buys is about to be reclassified out of the car column, and 1973 is the base against which that shows" },
        { lineId: "saving", reason: "the inflection panel's reading, which every later panel on this page reads below" },
        { lineId: "loan", reason: "the term has lengthened by a year and a half since 1965 while the rate has risen two points, and the two move the total in opposite directions" },
        { lineId: "budget", reason: "the wave that shares this panel's own years, so the budget and the wage on this panel are measured at the same time for once" }
      ],
      cells: {
        occupation: { a: cell("Manufacturing, 18,589 of 76,912 thousand nonfarm jobs, 24.2%", "ces-emp", { year: 1973, note: "Payroll jobs, not people. Share computed from the two series." }) },
        hours: { a: cell("36.9 hours", "ces-awh", { year: 1973, note: "Production and nonsupervisory employees, all private industry, part-time work included." }) },
        earnings: { a: cell("$152.71 a week; $4.14 an hour", "ces-awe", { year: 1973, note: "Average weekly and hourly earnings of production and nonsupervisory employees across all private industry, as published." }) },
        income: { a: cell("$10,510 median household, $12,050 median family", "census-h5", { year: 1973, srcs: ["census-f5"], note: "Households: median $10,510, mean $12,160, across 69,860 thousand households (Table H-5). Families: median $12,050 (Table F-5). Two universes, two tables, printed side by side." }) },
        home: { a: cell("64.5% owned; a new house sold for $32,500", "census-hvs", { year: 1973, srcs: ["census-nrs"], note: "Homeownership from the Housing Vacancy Survey, which is not the decennial series used before 1970. The new-home figure is the median sales price of new single-family houses sold; the average was $35,500. At the year’s average hourly earnings that median is about 7,850 hours of work." }) },
        value: { a: cell("$17,000 at the 1970 census", "census-coh-values", { year: 1970, note: "The census three years before this panel. The Bureau’s universe: owner-occupied single-family housing units on less than 10 acres without a business or medical office on the property — the homes already lived in, against the $32,500 on the home line above, which prices a new house sold. No work-time is shown: the census year is not this panel’s wage year." }) },
        roof: { a: cell("$108 a month rent in 1970, $243 in 1980", "census-coh-rent", { year: 1970, note: "Median gross rent at the bracketing censuses — rent plus the estimated average monthly cost of utilities and fuels. The rise across this decade is the largest the series records between any two censuses." }) },
        household: { a: cell("3.01 people; 44.7% of women in the labor force", "census-hh6", { year: 1973, srcs: ["cps-flfp", "census-ms2"], note: "Average population per household. Women’s participation is the annual average, 16 and over. Median age at first marriage: 23.2 for men, 21.0 for women." }) },
        transport: { a: cell("101,985 thousand automobiles registered", "fhwa-mv", { year: 1973 }) },
        basket: {
          a: {
            items: [
              { label: "a dozen eggs", price: null, unit: "dozen", src: "bls-ap", note: "The modern average-price series for food begin in 1980." },
              { label: "half a gallon of milk", price: null, unit: "half gallon", src: "bls-ap", note: "The modern average-price series for food begin in 1980." },
              { label: "a pound of butter", price: null, unit: "pound", src: "bls-ap", note: "The modern average-price series for food begin in 1980." },
              { label: "a pound of round steak", price: null, unit: "pound", src: "bls-ap", note: "The modern average-price series for food begin in 1980." },
              { label: "a pound of bread", price: null, unit: "pound", src: "bls-ap", note: "The modern average-price series for food begin in 1980." },
              { label: "a gallon of gasoline, leaded regular", price: 0.388, unit: "gallon", src: "eia-gas", year: 1973, note: "The 1974 annual average is $0.532." },
              { label: "a first-class stamp", price: 0.08, unit: "letter", src: "usps-rates", year: 1973, note: "8 cents from 16 May 1971 until 2 March 1974." }
            ]
          }
        },
        unemployment: { a: cell("4.9%", "cps-unemp", { year: 1973 }) },
        saving: { a: cell("13.5% of disposable income", "bea-nipa21", { year: 1973, note: "An accounting residual for households and the nonprofits serving them, not a survey of what families set aside." }) },
        homesize: { a: cell("1,525 square feet", "census-sqft", { year: 1973, note: "Median floor area of new single-family houses completed; the average was 1,660. This Census series begins here, and it is not the survey the 1955 panel's floor area comes from." }) },
        trucks: { a: cell("23,244 thousand trucks", "fhwa-mv", { year: 1973, note: "Against 101,985 thousand automobiles. This panel is where the instrument changes: the Historical Statistics column that carried the earlier panels ends at 1970, and from here the count is the Federal Highway Administration’s own annual volume. The two are the same underlying registration count at different vintages and are never drawn as one line." }) },
        loan: { a: cell("$189 a month for 24.0 years; $24,600 repaid as $54,482", "fhfa-mirs", { year: 1973, note: "Averages on conventional single-family mortgages closed in 1973: rate 7.80 per cent, term 24.0 years, loan $24,600 against a purchase price of $33,700, loan-to-price 74.8 per cent. Amortised at that rate and term, principal and interest are $189 a month and $54,482 in all, including $29,882 of interest; counting the down payment brings the total to $63,582. The page's payment arithmetic excludes taxes, insurance, utilities and fees and assumes the loan runs its full term." }) },
        budget: { a: cell("Housing 30.8%, food 19.3% of $8,348 spent, 1972-73", "bls-r991", { year: 1972, note: "Housing $2,551, transportation $1,597, food $1,596, clothing $647, healthcare $528. Income averaged $11,419 against $8,348 spent. Food's share has fallen by more than half since 1901 while housing's has risen by a third; transportation now costs the average family as much as food does." }) },
        electric: { a: cell("the column ends at 1956, at 98.8%", "hsus-s109", { absent: true, year: 1956, note: "The percentage-of-dwellings columns stop at 1956 and are dashes thereafter. No later national reading of this construct is printed here." }) },
        power: { a: cell("7,066 kilowatt-hours a year, 1970", "hsus-s108", { year: 1970, note: "Per residential customer, and the last figure this column prints. It has risen twenty-seven-fold since the column’s first reading of 264 kilowatt-hours in 1912. From here the record on this line breaks: the next panel says why." }) },
        elecprice: { a: cell("2.10 cents a kilowatt-hour, 1970", "hsus-s116", { year: 1970, note: "The last figure this column prints, and the lowest anywhere in it. When a reading next appears on this page, at 1985, it is four times this one and comes from a different instrument, so the rise between them is not measured by anything." }) },
        farmcity: { a: cell("Farm 80.5% owned, nonfarm 62.0% in 1970", "hsus-n243", { year: 1970, note: "The last reading this table gives. The farm household out-owned the city household at every census from 1890 to 1970 and by more at the end than in the middle. The table’s own note warns that the farm-nonfarm breakdown does not add to the total, the 1970 totals having been revised after the tabulations were completed." }) },
        service: { a: cell("1,103 of 30,601 thousand women at work in 1970, 3.6%", "hsus-d182", { year: 1970, note: "Private household workers among women in the experienced civilian labor force, on the 14-and-over basis every earlier reading in this line uses. From 28.7 per cent in 1900 to 3.6 in 1970. The occupation that employed more women than any other at the century’s gate takes one woman at work in twenty-eight by the end of the table, and this is the last census the table carries. Shares computed from the table’s own two rows." }) },
        bills: { a: cell("Utility gas heated 55.2% of homes in 1970; fuel oil 26.0%", "census-coh-fuels", { year: 1970, note: "Of 63,446,641 occupied units at the 1970 census: utility gas 55.2 per cent, fuel oil and kerosene 26.0, electricity 7.7, bottled or tank gas 6.0, coal or coke 2.9, wood 1.3. Coal heated more than half of American homes in 1940 and heats one in thirty-four here. This is what the house burned; no published bill reaches this panel." }) },
        insurance: { a: cell("Healthcare, $528 a year, 6.4%", "bls-r991", { year: 1972, note: "The 1972-73 wave. The share has been between 6 and 7 per cent since 1960-61 and the category is still healthcare undivided — the premium is not separated out of it anywhere in this lineage." }) }
      }
    },

    /* ------------------------------------------------------------ 1985 ---- */
    {
      id: "1985",
      label: "1985",
      title: "Two earners as the ordinary case",
      columns: [{ key: "a", label: "1985" }],
      construct: "From this panel the basket returns, on a different instrument: the Bureau of Labor Statistics average-price series, which begin between 1976 and 1980. They are monthly, with no annual average in the file used, so every price shown is the JUNE reading of its year. The wage it is divided by is the year’s average. Fuel switches grade here: the leaded and unleaded series both exist in 1985, and unleaded is the one carried forward.",
      texture: [
        { lineId: "unemployment", reason: "the reading is the highest of the six panels from 1973 on" },
        { lineId: "elecprice", reason: "the household’s most invisible bill, on a series that runs from here to the present" },
        { lineId: "homesize", reason: "the new house gains 80 square feet between 1973 and 1985, against 315 in the decade after" },
        { lineId: "trucks", reason: "the truck column grows far faster than the car column across this stretch" },
        { lineId: "saving", reason: "the rate has fallen by about a third since 1973, on the same table" },
        { lineId: "loan", reason: "the highest average contract rate the survey records at any panel on this page, and the one year where the interest on the loan runs to twice the sum borrowed" }
      ],
      cells: {
        occupation: { a: cell("Manufacturing, 17,819 of 97,532 thousand nonfarm jobs, 18.3%", "ces-emp", { year: 1985, note: "Share computed from the two series." }) },
        hours: { a: cell("34.9 hours", "ces-awh", { year: 1985 }) },
        earnings: { a: cell("$304.37 a week; $8.73 an hour", "ces-awe", { year: 1985 }) },
        income: { a: cell("$23,620 median household, $29,070 mean", "census-h5", { year: 1985, note: "Across 88,460 thousand households." }) },
        home: { a: cell("63.9% owned; a new house sold for $84,300", "census-hvs", { year: 1985, srcs: ["census-nrs"], note: "Median sales price of new single-family houses sold; the average was $100,800. At the year’s average hourly earnings that is about 9,656 hours of work." }) },
        value: { a: cell("$47,200 at the 1980 census", "census-coh-values", { year: 1980, note: "The Bureau’s universe: owner-occupied single-family housing units on less than 10 acres without a business or medical office on the property. Against the 1970 census the figure is 2.8 times as large in money, on the same instrument and the same universe. No work-time is shown: the census year is not this panel’s wage year." }) },
        roof: { a: cell("$243 a month rent in 1980, $447 in 1990", "census-coh-rent", { year: 1980, note: "Median gross rent at the bracketing censuses — rent plus the estimated average monthly cost of utilities and fuels. No owner-cost counterpart is measured until 2005." }) },
        household: { a: cell("2.69 people; 54.5% of women in the labor force", "census-hh6", { year: 1985, srcs: ["cps-flfp", "census-ms2", "bls-mcf-earners"], note: "Median age at first marriage: 25.5 for men, 23.3 for women. In the same year 54.5% of married-couple families had both husband and wife as earners during the year — 27,787 of 50,978 thousand, against 20.4% with the husband as sole earner and 43.6% with two earners in 1967 (bls-mcf-earners). That this equals the women's participation figure is coincidence: one construct counts families, the other counts women." }) },
        transport: { a: cell("127,885 thousand automobiles registered", "fhwa-mv", { year: 1985 }) },
        basket: {
          a: {
            items: [
              { label: "a dozen eggs", price: 0.724, unit: "dozen", src: "bls-ap", year: 1985 },
              { label: "half a gallon of milk", price: 1.138, unit: "half gallon", src: "bls-ap", year: 1985 },
              { label: "a pound of butter", price: 2.138, unit: "pound", src: "bls-ap", year: 1985 },
              { label: "a pound of round steak", price: 2.844, unit: "pound", src: "bls-ap", year: 1985, note: "USDA Choice, boneless. The earlier panels priced top round, bone-in." },
              { label: "a pound of bread", price: 0.546, unit: "pound", src: "bls-ap", year: 1985 },
              { label: "a gallon of gasoline, unleaded regular", price: 1.202, unit: "gallon", src: "eia-gas", year: 1985, note: "Leaded regular, the grade carried in the earlier panels, reads $1.115 in the same year." },
              { label: "a first-class stamp", price: 0.22, unit: "letter", src: "usps-rates", year: 1985, note: "22 cents from 17 February 1985." }
            ]
          }
        },
        unemployment: { a: cell("7.2%", "cps-unemp", { year: 1985 }) },
        elecprice: { a: cell("8.5 cents", "bls-ap", { year: 1985, note: "June reading, U.S. city average." }) },
        saving: { a: cell("9.1% of disposable income", "bea-nipa21", { year: 1985, note: "Against 13.5% in 1973. An accounting residual for households and the nonprofits serving them, not a survey of what families set aside." }) },
        homesize: { a: cell("1,605 square feet", "census-sqft", { year: 1985, note: "Median; the average was 1,785. The median had been 1,525 in 1973." }) },
        trucks: { a: cell("43,210 thousand trucks", "fhwa-mv", { year: 1985, note: "Against 23,244 thousand in 1973." }) },
        loan: { a: cell("$692 a month for 25.9 years; $70,200 repaid as $215,174", "fhfa-mirs", { year: 1985, note: "Averages on conventional single-family mortgages closed in 1985: rate 11.17 per cent, term 25.9 years, loan $70,200 against a purchase price of $96,100, loan-to-price 75.8 per cent. Amortised at that rate and term, principal and interest are $692 a month and $215,174 in all, including $144,974 of interest — 207 per cent of the sum borrowed; counting the down payment brings the total to $241,074. The page's payment arithmetic excludes taxes, insurance, utilities and fees and assumes the loan runs its full term; a borrower who sold or refinanced paid less of that interest." }) },
        electric: { a: cell("the column ends at 1956, at 98.8%", "hsus-s109", { absent: true, year: 1956, note: "The percentage-of-dwellings columns stop at 1956 and are dashes thereafter. No later national reading of this construct is printed here." }) },
        power: { a: cell("no reading between 1970 and the bill tables", "hsus-s108", { absent: true, srcs: ["eia-esr1995"], note: "The Historical Statistics column that carried this line prints its last figure at 1970. The Energy Information Administration’s annual report for these years publishes, in its own words, “electricity sales, associated revenue, average revenue per kilowatthour sold, and number of consumers” — and no consumption per customer. Dividing the first by the last would be this page’s arithmetic on two columns the issuer never joined, so nothing is printed. The gap runs to the Form EIA-861 bill table that opens on the 2005 panel." }) },
        farmcity: { a: cell("the series ends at 1970", "hsus-n243", { absent: true, year: 1970, note: "The farm-and-nonfarm tenure table runs 1890 to 1970 and stops. Its last reading, on the 1973 panel, is farm 80.5 per cent owned against nonfarm 62.0. Nothing later on this page splits ownership that way, and the 1970 figures are not carried forward as if they still held." }) },
        service: { a: cell("the census table ends at 1970", "hsus-d182", { absent: true, year: 1970, note: "The major-occupation-group table runs 1900 to 1970. Its last reading, on the 1973 panel, is 1,103 of 30,601 thousand women at work, 3.6 per cent. This page prints no later figure for it and makes no claim about what became of the category in the classifications that followed." }) },
        bills: { a: cell("Utility gas heated 53.1% of homes in 1980; electricity 18.4%", "census-coh-fuels", { year: 1980, note: "Of 80,389,673 occupied units at the 1980 census: utility gas 53.1 per cent, electricity 18.4, fuel oil and kerosene 18.2, bottled or tank gas 5.6, wood 3.2, coal or coke 0.6. Electricity has gone from a column the 1940 census did not carry to a fifth of American homes. Wood rises too, from 1.3 per cent in 1970 to 3.2 here, which runs against the direction of the rest of the table. This is what the house burned; the first published bill on this page is on the 2005 panel." }) },
        budget: { a: cell("Housing 30.4%, food 15.0% of $21,975 spent, 1984-85", "bls-r991", { year: 1984, note: "Housing $6,674, food $3,290, apparel $1,319. Income averaged $23,464 against $21,975 spent. Food has fallen below a sixth of spending for the first time in the lineage; in 1901 it took more than two-fifths. Shares are of what the wave’s own families spent, and the population is all consumer units, not the urban wage-earner families of 1901." }) },
        insurance: { a: cell("Healthcare, $1,049 a year, 4.8%", "bls-r991", { year: 1984, note: "The 1984-85 wave: 6.4 per cent of spending at the wave before, 4.8 here, the largest fall the share records between two waves. The category is still healthcare undivided, and a share that falls is not a bill that falls — the dollar figure doubled across the same twelve years." }) }
      }
    },

    /* ------------------------------------------------------------ 1995 ---- */
    {
      id: "1995",
      label: "1995",
      title: "The computer arrives, the price of a house does not wait",
      columns: [{ key: "a", label: "1995" }],
      construct: "The same instruments as 1985. Milk is the one item whose unit is about to change: the half-gallon series ends in 1997 and the gallon series begins in 1995, so this is the last panel that prices milk in the same unit as 1900.",
      texture: [
        { lineId: "unemployment", reason: "read against 1985 it is the plainest measure of what the decade did" },
        { lineId: "elecprice", reason: "the bill keeps rising in money while the wage rises faster" },
        { lineId: "homesize", reason: "the new house gains three hundred square feet in ten years, the largest step in the series" },
        { lineId: "trucks", reason: "the truck column passes half the car column in this decade" },
        { lineId: "saving", reason: "the fall between 1985 and 1995 carries on, on the same table" },
        { lineId: "loan", reason: "the rate has fallen by three and a half points since 1985 while the loan has grown by half again, and the panel is where the two effects can be read against each other" }
      ],
      cells: {
        occupation: { a: cell("Manufacturing, 17,241 of 117,400 thousand nonfarm jobs, 14.7%", "ces-emp", { year: 1995, note: "The manufacturing count is almost unchanged from 1973; the denominator is half as large again. Share computed from the two series." }) },
        hours: { a: cell("34.3 hours", "ces-awh", { year: 1995 }) },
        earnings: { a: cell("$399.93 a week; $11.65 an hour", "ces-awe", { year: 1995 }) },
        income: { a: cell("$34,080 median household, $44,940 mean", "census-h5", { year: 1995, note: "Across 99,630 thousand households." }) },
        home: { a: cell("64.7% owned; a new house sold for $133,900", "census-hvs", { year: 1995, srcs: ["census-nrs"], note: "Median sales price; the average was $158,700. At the year’s average hourly earnings that is about 11,494 hours of work." }) },
        value: { a: cell("$79,100 at the 1990 census", "census-coh-values", { year: 1990, note: "The Bureau’s universe: owner-occupied single-family housing units on less than 10 acres without a business or medical office on the property. The series has one reading left after this one: it ends at the 2000 census, and from 2005 the subject is carried by the American Community Survey instead. No work-time is shown: the census year is not this panel’s wage year." }) },
        roof: { a: cell("$447 a month rent in 1990, $602 in 2000", "census-coh-rent", { year: 1990, note: "Median gross rent at the bracketing censuses — rent plus the estimated average monthly cost of utilities and fuels. The 2000 census is the last this series carries; from the next panel the rent comes from the American Community Survey, a different instrument, and the two are never drawn as one line." }) },
        household: { a: cell("2.65 people; 58.9% of women in the labor force", "census-hh6", { year: 1995, srcs: ["cps-flfp", "census-ms2"], note: "Median age at first marriage: 26.9 for men, 24.5 for women." }) },
        transport: { a: cell("128,387 thousand automobiles registered", "fhwa-mv", { year: 1995 }) },
        basket: {
          a: {
            items: [
              { label: "a dozen eggs", price: 0.825, unit: "dozen", src: "bls-ap", year: 1995 },
              { label: "half a gallon of milk", price: 1.420, unit: "half gallon", src: "bls-ap", year: 1995 },
              { label: "a pound of butter", price: 1.553, unit: "pound", src: "bls-ap", year: 1995 },
              { label: "a pound of round steak", price: 3.136, unit: "pound", src: "bls-ap", year: 1995 },
              { label: "a pound of bread", price: 0.781, unit: "pound", src: "bls-ap", year: 1995 },
              { label: "a gallon of gasoline, unleaded regular", price: 1.147, unit: "gallon", src: "eia-gas", year: 1995, note: "Lower in money than the 1985 reading." },
              { label: "a first-class stamp", price: 0.32, unit: "letter", src: "usps-rates", year: 1995, note: "32 cents from 1 January 1995." }
            ]
          }
        },
        unemployment: { a: cell("5.6%", "cps-unemp", { year: 1995 }) },
        elecprice: { a: cell("9.8 cents", "bls-ap", { year: 1995, note: "June reading." }) },
        saving: { a: cell("6.8% of disposable income", "bea-nipa21", { year: 1995, note: "Against 9.1% in 1985. An accounting residual for households and the nonprofits serving them, not a survey of what families set aside." }) },
        homesize: { a: cell("1,920 square feet", "census-sqft", { year: 1995, note: "Median; the average was 2,095." }) },
        trucks: { a: cell("72,458 thousand trucks", "fhwa-mv", { year: 1995 }) },
        loan: { a: cell("$806 a month for 27.4 years; $110,400 repaid as $265,068", "fhfa-mirs", { year: 1995, note: "Averages on conventional single-family mortgages closed in 1995: rate 7.69 per cent, term 27.4 years, loan $110,400 against a purchase price of $142,800, loan-to-price 79.9 per cent — the highest ratio at any panel on this page, meaning the smallest share paid down at the start. Amortised at that rate and term, principal and interest are $806 a month and $265,068 in all, including $154,668 of interest; counting the down payment brings the total to $297,468. The page's payment arithmetic excludes taxes, insurance, utilities and fees and assumes the loan runs its full term." }) },
        electric: { a: cell("the column ends at 1956, at 98.8%", "hsus-s109", { absent: true, year: 1956, note: "The percentage-of-dwellings columns stop at 1956 and are dashes thereafter. No later national reading of this construct is printed here." }) },
        power: { a: cell("no reading between 1970 and the bill tables", "hsus-s108", { absent: true, srcs: ["eia-esr1995"], note: "The report for this very year states what it contains: “electricity sales, associated revenue, average revenue per kilowatthour sold, and number of consumers.” It publishes no consumption per customer and no average bill; those begin with the Form EIA-861 table that opens on the 2005 panel. Sales divided by consumers would be this page’s arithmetic on two columns the issuer never joined, and it is not computed." }) },
        farmcity: { a: cell("the series ends at 1970", "hsus-n243", { absent: true, year: 1970, note: "The farm-and-nonfarm tenure table runs 1890 to 1970 and stops; its last reading sits on the 1973 panel." }) },
        service: { a: cell("the census table ends at 1970", "hsus-d182", { absent: true, year: 1970, note: "The major-occupation-group table runs 1900 to 1970 and stops; its last reading, 3.6 per cent, sits on the 1973 panel." }) },
        bills: { a: cell("Utility gas heated 51.0% of homes in 1990; electricity 25.8%", "census-coh-fuels", { year: 1990, note: "Of 91,947,410 occupied units at the 1990 census: utility gas 51.0 per cent, electricity 25.8, fuel oil and kerosene 12.2, bottled or tank gas 5.7, wood 3.9, coal or coke 0.4. Electricity has passed a quarter of homes and oil has lost a third of its share since 1980. This is what the house burned; the first published bill on this page is on the next panel." }) },
        budget: { a: cell("Housing 32.1%, food 13.8% of $34,312 spent, 1996-97", "bls-r991", { year: 1996, note: "Housing $11,011, food $4,750, apparel $1,741. Income averaged $38,983 against $34,312 spent. Housing has been the largest category at every wave since 1960-61 and takes very nearly a third here; apparel, which took 14.0 per cent in 1901, takes 5.1." }) },
        insurance: { a: cell("Healthcare, $1,806 a year, 5.3%", "bls-r991", { year: 1996, note: "The 1996-97 wave. Still healthcare as one category: the lineage never separates the premium from the bill, and the split this line shows at the end of the page comes from a different release." }) }
      }
    },

    /* ------------------------------------------------------------ 2005 ---- */
    {
      id: "2005",
      label: "2005",
      title: "The housing-boom household",
      columns: [{ key: "a", label: "2005" }],
      construct: "Milk changes unit at this panel: from here it is priced by the gallon, and no figure on this page divides one into the other. Homeownership is shown at the two years around 2005 that the annual table prints in the blocks retrieved, in the same way the earlier panels are bracketed by censuses. This is also the panel where what a house is worth changes instrument: the decennial home-value series ends at the 2000 census and the American Community Survey takes the subject up here, on a wider universe — all owner-occupied units against the census series' single-family units on under 10 acres. Both readings are printed on the line and no arrow is drawn between them. The vehicle counts are the 2005 edition of the Federal Highway Administration's annual table, read for its own data year as the 2015 and 2025 panels' counts are.",
      texture: [
        { lineId: "unemployment", reason: "the ordinary rate at the top of the boom, which the boom is not usually remembered for" },
        { lineId: "bills", reason: "the first panel at which the electricity bill itself is published rather than inferred from a price, and the meter beside it begins its fall" },
        { lineId: "loan", reason: "the longest average term the survey records, and the panel where the boom's price and the loan behind it can be read together" },
        { lineId: "saving", reason: "the lowest reading the series has recorded since 1934, in the panel the housing boom names" },
        { lineId: "homesize", reason: "the house and its price move together here, and the panel is the one place the reader can see both" },
        { lineId: "trucks", reason: "the panel that shows the two columns still the way round they are on every earlier panel that carries both" }
      ],
      cells: {
        occupation: { a: cell("Manufacturing, 14,225 of 134,033 thousand nonfarm jobs, 10.6%", "ces-emp", { year: 2005, note: "Share computed from the two series." }) },
        hours: { a: cell("33.8 hours", "ces-awh", { year: 2005 }) },
        earnings: { a: cell("$543.91 a week; $16.11 an hour", "ces-awe", { year: 2005 }) },
        income: { a: cell("$46,330 median household, $63,340 mean", "census-h5", { year: 2005, note: "Across 114,400 thousand households." }) },
        home: { a: cell("69.0% owned in 2004, 68.8% in 2006; a new house sold for $240,900", "census-hvs", { year: 2004, srcs: ["census-nrs"], note: "Median sales price of new single-family houses sold in 2005; the average was $297,000. At the year’s average hourly earnings that is about 14,953 hours of work." }) },
        value: { a: cell("$119,600 in 2000; $167,500 on the 2005 survey", "census-coh-values", { year: 2000, srcs: ["acs-value"], note: "The panel where the instrument changes, so both readings are printed and neither is joined to the other. The decennial series ends at 2000 on the Bureau’s universe of owner-occupied single-family housing units on less than 10 acres without a business or medical office on the property. The 2005 figure is the American Community Survey’s, whose universe is all owner-occupied housing units — condominiums and mobile homes included. The distance between the two figures is five years AND a change of instrument and universe, and it is not a measured rise. What the survey collects is the owner’s own answer: “Value is the respondent’s estimate of how much the property (house and lot, mobile home and lot (if lot owned), or condominium unit) would sell for if it were for sale.” At 2005’s average hourly earnings the survey figure is about 10,397 hours of work; the 2000 figure carries none, because its year is not this panel’s wage year." }) },
        roof: { a: cell("Rent $728 a month; owner with a mortgage $1,295", "acs-rent", { year: 2005, srcs: ["acs-smoc"], note: "The first panel on this page where both sides are measured — one survey, one year, one set of definitions. Median gross rent across renter-occupied units paying cash rent, $728; median selected monthly owner costs, $1,295 for owners with a mortgage and $369 for owners without one. Both figures already include utilities and fuels, which is what makes them comparable to each other and is why neither is added to the bills line." }) },
        household: { a: cell("2.57 people; 59.3% of women in the labor force", "census-hh6", { year: 2005, srcs: ["cps-flfp", "census-ms2"], note: "Median age at first marriage: 27.1 for men, 25.3 for women. Women’s participation had peaked at 60.0 per cent in 1999." }) },
        transport: { a: cell("136,568 thousand automobiles registered", "fhwa-mv", { year: 2005, note: "The total column of the 2005 edition of Table MV-1, dated October 2006: 135,192,288 private and commercial plus 1,375,795 publicly owned." }) },
        basket: {
          a: {
            items: [
              { label: "a dozen eggs", price: 1.139, unit: "dozen", src: "bls-ap", year: 2005 },
              { label: "a gallon of milk", price: 3.122, unit: "gallon", src: "bls-ap", year: 2005, note: "A gallon, not the half gallon priced in every earlier panel." },
              { label: "a pound of butter", price: 3.107, unit: "pound", src: "bls-ap", year: 2005 },
              { label: "a pound of round steak", price: 4.149, unit: "pound", src: "bls-ap", year: 2005 },
              { label: "a pound of bread", price: 1.090, unit: "pound", src: "bls-ap", year: 2005 },
              { label: "a gallon of gasoline, unleaded regular", price: 2.295, unit: "gallon", src: "eia-gas", year: 2005 },
              { label: "a first-class stamp", price: 0.37, unit: "letter", src: "usps-rates", year: 2005, note: "37 cents from 30 June 2002 until 8 January 2006." }
            ]
          }
        },
        unemployment: { a: cell("5.1%", "cps-unemp", { year: 2005 }) },
        bills: { a: cell("$88.60 a month for electricity; 938 kilowatt-hours", "eia-861", { year: 2005, note: "The average residential electricity bill across 120,760,839 customers, at an average price of 9.45 cents a kilowatt-hour. This is the bill the form publishes, not a price multiplied by a quantity here. It is a different instrument from the June price readings carried on the 1985 and 1995 panels, and the two are never drawn as one line." }) },
        saving: { a: cell("2.2% of disposable income", "bea-nipa21", { year: 2005, note: "The lowest annual reading in the series since 1934, which read 1.7; every year from 1935 to 2004 is above it. An accounting residual for households and the nonprofits serving them, not a survey of what families set aside." }) },
        homesize: { a: cell("2,227 square feet", "census-sqft", { year: 2005, note: "Median; the average was 2,434." }) },
        trucks: { a: cell("103,819 thousand trucks", "fhwa-mv", { year: 2005, note: "Against 136,568 thousand automobiles: the automobile column is the larger of the two here, as it is on every earlier panel that carries both." }) },
        loan: { a: cell("$1,275 a month for 28.5 years; $211,900 repaid as $435,909", "fhfa-mirs", { year: 2005, note: "Averages on conventional single-family mortgages closed in 2005: rate 5.85 per cent, term 28.5 years — the longest the survey records at any panel on this page — loan $211,900 against a purchase price of $299,800, loan-to-price 74.7 per cent. Amortised at that rate and term, principal and interest are $1,275 a month and $435,909 in all, including $224,009 of interest; counting the down payment brings the total to $523,809. The page's payment arithmetic excludes taxes, insurance, utilities and fees and assumes the loan runs its full term." }) },
        power: { a: cell("938 kilowatt-hours a month", "eia-861", { year: 2005, note: "Average monthly consumption per residential customer across 120,760,839 customers. The unit is a MONTH here and a YEAR on every panel down to 1973, because the instrument changed: the Historical Statistics column ended at 1970 and the form’s own table begins in the 2000s. The two are not joined and no annual figure is computed from this one." }) },
        elecprice: { a: cell("9.45 cents a kilowatt-hour", "eia-861", { year: 2005, note: "The average price the form publishes across all residential customers. It is a third instrument on this line: the utility average to 1970, a June city average at 1985 and 1995, and this from here on. No line is drawn between them — the 1995 reading of 9.8 cents and this one of 9.45 are not a fall, they are two different measurements." }) },
        electric: { a: cell("the column ends at 1956, at 98.8%", "hsus-s109", { absent: true, year: 1956, note: "The percentage-of-dwellings columns stop at 1956 and are dashes thereafter. No later national reading of this construct is printed here." }) },
        farmcity: { a: cell("the series ends at 1970", "hsus-n243", { absent: true, year: 1970, note: "The farm-and-nonfarm tenure table runs 1890 to 1970 and stops; its last reading sits on the 1973 panel." }) },
        service: { a: cell("the census table ends at 1970", "hsus-d182", { absent: true, year: 1970, note: "The major-occupation-group table runs 1900 to 1970 and stops; its last reading, 3.6 per cent, sits on the 1973 panel." }) },
        budget: { a: cell("Housing 32.8%, food 13.1% of $40,748 spent, 2002-03", "bls-r991", { year: 2002, note: "Housing $13,359, food $5,357, apparel $1,694. Income averaged $50,302 against $40,748 spent. This is the last wave the century-long compilation carries: food, clothing and housing together took 79.8 per cent of spending in 1901 and take 50.1 here, and what was left over for everything else went from $155 to $20,333." }) },
        insurance: { a: cell("Healthcare, $2,384 a year, 5.9%", "bls-r991", { year: 2002, note: "The 2002-03 wave, and the last healthcare figure this lineage prints. The share has moved between 3.9 and 6.6 per cent across the seven waves that print it, while the dollars went from $59 to $2,384." }) }
      }
    },

    /* ------------------------------------------------------------ 2015 ---- */
    {
      id: "2015",
      label: "2015",
      title: "The post-crisis ledger",
      columns: [{ key: "a", label: "2015" }],
      construct: "One caution rides every income comparison that crosses this decade: the household survey was redesigned in 2013 and its table prints two figures for that year, $51,940 on the old questionnaire and $53,590 on the new. A sentence running from 2005 to 2015 crosses that seam. Butter has no price on this panel: the series used ended in 2012 and its replacement begins in 2018. A second seam runs under the home-value line: the American Community Survey reworded its value question in 2008 and replaced its pre-coded answers with a write-in box, and the Bureau's own content test found the change may introduce an inconsistency in the data between 2007 and 2008 — this panel's reading and the 2005 one sit on either side of it.",
      texture: [
        { lineId: "unemployment", reason: "the reading is higher than 2005 and lower than 1985, which is the shape of the decade in one number" },
        { lineId: "bills", reason: "the bill rises by a quarter across the decade while the meter behind it falls, which no price line on its own would show" },
        { lineId: "loan", reason: "the lowest average contract rate the survey records, against the highest average loan — the panel where the cheap rate and the large principal meet" },
        { lineId: "homesize", reason: "the largest median floor area this page carries, on the Census series that begins in 1973 and never reaches the 1955 panel" },
        { lineId: "trucks", reason: "trucks now outnumber cars on the register, which is where the household vehicle went" },
        { lineId: "saving", reason: "the rate after the crisis, against the boom year the panel before it carries" }
      ],
      cells: {
        occupation: { a: cell("Manufacturing, 12,309 of 141,825 thousand nonfarm jobs, 8.7%", "ces-emp", { year: 2015, note: "Share computed from the two series." }) },
        hours: { a: cell("33.7 hours", "ces-awh", { year: 2015 }) },
        earnings: { a: cell("$708.73 a week; $21.03 an hour", "ces-awe", { year: 2015 }) },
        income: { a: cell("$56,520 median household, $79,260 mean", "census-h5", { year: 2015, note: "Across 125,800 thousand households. The 2013 redesign sits between this figure and the 2005 one." }) },
        home: { a: cell("63.7% owned; a new house sold for $294,200", "census-hvs", { year: 2015, srcs: ["census-nrs"], note: "Median sales price; the average was $352,700. At the year’s average hourly earnings that is about 13,990 hours of work." }) },
        value: { a: cell("$194,500 on the 2015 survey", "acs-value", { year: 2015, note: "The American Community Survey’s median value, universe all owner-occupied housing units, and the owner’s own estimate of what the property would sell for. About 9,249 hours of work at the year’s average hourly earnings. Read against 2005 with the Bureau’s own caution: the 2008 questionnaire reworded the value question and replaced its pre-coded answers with a write-in box, and the Bureau’s content test found the change “may introduce an inconsistency in the data produced for this question as observed from the years 2007 to 2008.” The change sits between this reading and the last one." }) },
        roof: { a: cell("Rent $959 a month; owner with a mortgage $1,477", "acs-rent", { year: 2015, srcs: ["acs-smoc"], note: "Median gross rent across the 43,701,738 renter-occupied units, $959; median selected monthly owner costs $1,477 with a mortgage and $468 without one. Both include utilities and fuels. Rent has risen by a third since the 2005 panel while the owner's monthly cost has risen by a seventh — the two sides of this line do not move together." }) },
        household: { a: cell("2.54 people; 56.7% of women in the labor force", "census-hh6", { year: 2015, srcs: ["cps-flfp", "census-ms2"], note: "Median age at first marriage: 29.2 for men, 27.1 for women. Women’s participation is below its 1999 reading of 60.0 per cent." }) },
        transport: { a: cell("112,864 thousand automobiles registered", "fhwa-mv", { year: 2015 }) },
        basket: {
          a: {
            items: [
              { label: "a dozen eggs", price: 2.570, unit: "dozen", src: "bls-ap", year: 2015 },
              { label: "a gallon of milk", price: 3.366, unit: "gallon", src: "bls-ap", year: 2015 },
              { label: "a pound of butter", price: null, unit: "pound", src: "bls-ap", note: "The butter series used ran to April 2012; its replacement begins in April 2018." },
              { label: "a pound of round steak", price: 6.183, unit: "pound", src: "bls-ap", year: 2015 },
              { label: "a pound of bread", price: 1.467, unit: "pound", src: "bls-ap", year: 2015 },
              { label: "a gallon of gasoline, unleaded regular", price: 2.448, unit: "gallon", src: "eia-gas", year: 2015 },
              { label: "a first-class stamp", price: 0.49, unit: "letter", src: "usps-rates", year: 2015, note: "49 cents from 26 January 2014." }
            ]
          }
        },
        unemployment: { a: cell("5.3%", "cps-unemp", { year: 2015 }) },
        bills: { a: cell("$114.03 a month for electricity; 901 kilowatt-hours", "eia-861", { year: 2015, note: "Across 129,811,718 residential customers, at an average price of 12.65 cents a kilowatt-hour. The bill is up by a quarter on the 2005 panel while the average customer used 37 fewer kilowatt-hours a month: the bill and the meter move in opposite directions across this decade." }) },
        saving: { a: cell("5.8% of disposable income", "bea-nipa21", { year: 2015, note: "Against 2.2% in 2005. An accounting residual for households and the nonprofits serving them, not a survey of what families set aside." }) },
        homesize: { a: cell("2,467 square feet", "census-sqft", { year: 2015, note: "Median; the average was 2,687, and 2,467 is the largest median this page carries." }) },
        trucks: { a: cell("141,256 thousand trucks", "fhwa-mv", { year: 2015, note: "Against 112,864 thousand automobiles. On the 2005 panel the automobile column was the larger; the two columns swap places somewhere between these two panels, and the table's own classification break at the 2012 data year sits inside that gap." }) },
        loan: { a: cell("$1,500 a month for 28.4 years; $309,543 repaid as $511,247", "fhfa-mirs", { year: 2015, note: "Averages on conventional single-family mortgages closed in 2015: rate 3.88 per cent — the lowest at any panel here — term 28.4 years, loan $309,543 against a purchase price of $417,200, loan-to-price 77.8 per cent. Amortised at that rate and term, principal and interest are $1,500 a month and $511,247 in all, including $201,704 of interest; counting the down payment brings the total to $618,904. Against 1985, the loan is more than four times larger and the interest on it is smaller as a share of what was borrowed: the rate and the principal pull in opposite directions. The page's payment arithmetic excludes taxes, insurance, utilities and fees and assumes the loan runs its full term. The survey was discontinued in 2019, so the 2025 panel carries no successor to this line." }) },
        power: { a: cell("901 kilowatt-hours a month", "eia-861", { year: 2015, note: "Average monthly consumption per residential customer across 129,811,718 customers, against 938 in 2005. A month, not a year: the unit differs from every panel down to 1973 and the two instruments are not joined." }) },
        elecprice: { a: cell("12.65 cents a kilowatt-hour", "eia-861", { year: 2015, note: "The form’s own average price across all residential customers, up by a third on 2005. The meter fell over the same decade, which is why the bill line beside this one rises by less than the price does." }) },
        electric: { a: cell("the column ends at 1956, at 98.8%", "hsus-s109", { absent: true, year: 1956, note: "The percentage-of-dwellings columns stop at 1956 and are dashes thereafter. No later national reading of this construct is printed here." }) },
        farmcity: { a: cell("the series ends at 1970", "hsus-n243", { absent: true, year: 1970, note: "The farm-and-nonfarm tenure table runs 1890 to 1970 and stops; its last reading sits on the 1973 panel." }) },
        service: { a: cell("the census table ends at 1970", "hsus-d182", { absent: true, year: 1970, note: "The major-occupation-group table runs 1900 to 1970 and stops; its last reading, 3.6 per cent, sits on the 1973 panel." }) },
        budget: { a: cell("Housing 32.9%, food 12.5% of $55,978 spent, 2015", "ce-1702-2015", { year: 2015, note: "Housing $18,409, food $7,023, apparel and services $1,846, healthcare $4,342, of average annual expenditures of $55,978 across 128,437 thousand consumer units; income before taxes averaged $69,627. These shares are the Bureau’s own, printed in the table beside the dollars — unlike the 2025 panel’s, which are computed here. The century-long compilation that opens on the 1900 panel ended at its 2002-03 wave, so this is a separate release and not a tenth point on that series." }) },
        insurance: { a: cell("Health insurance $2,977 a year; vehicle insurance $1,079", "ce-1702-2015", { year: 2015, note: "Averages across all consumer units. This is the first panel where the survey separates a premium from the care it buys: healthcare in total was $4,342, of which health insurance was $2,977. Owners with a mortgage paid $3,676 and renters $1,652. The $6,349 the survey reports under personal insurance and pensions is mostly pension and Social Security contributions rather than premiums and is not counted here as insurance." }) }
      }
    },

    /* ------------------------------------------------------------ 2025 ---- */
    {
      id: "2025",
      label: "2025",
      title: "The ledger today",
      columns: [{ key: "a", label: "2025" }],
      construct: "Every value on this panel is dated on the line. The panel's year is 2025, so the wage and hours are 2025 annual averages and the prices and labor-force rates are June 2025 readings; the series that publish on a longer lag carry their most recent year instead — income, home ownership and the home value 2024, vehicle registrations 2024. Nothing here is projected forward, and no figure on this page forecasts anything.",
      texture: [
        { lineId: "unemployment", reason: "the June reading of the panel's own year" },
        { lineId: "bills", reason: "the household's most invisible bill at the panel's own year, and the third panel running on which the bill rises while the meter falls" },
        { lineId: "homesize", reason: "the new house is smaller than it was in 2015, which the price does not show" },
        { lineId: "budget", reason: "the closing point of the arc that opens on the 1900 panel: what share of a year's spending the necessities take now" },
        { lineId: "insurance", reason: "the other end of the line the 1901 survey opens, and the first panel at which the premium is counted apart from the care it buys" },
        { lineId: "saving", reason: "where the rate stands at the panel's own year, on the same table that opens in 1929" }
      ],
      cells: {
        occupation: { a: cell("Manufacturing, 12,707 of 160,256 thousand nonfarm jobs, 7.9%", "ces-emp", { year: 2025, note: "June 2025 for both series. Share computed from the two." }) },
        hours: { a: cell("33.7 hours", "ces-awh", { year: 2025, note: "Unchanged from 2015 to one decimal place." }) },
        earnings: { a: cell("$1,055.51 a week; $31.35 an hour", "ces-awe", { year: 2025 }) },
        income: { a: cell("$83,730 median household in 2024, $121,000 mean", "census-h5", { year: 2024, note: "Across 134,800 thousand households. The 2025 figure is not yet published." }) },
        home: { a: cell("65.6% owned in 2024; a new house sold for $417,400 in 2025", "census-hvs", { year: 2024, srcs: ["census-nrs"], note: "The median sales price of new single-family houses sold in 2025, from the July 2026 release; the average was $523,800. The revised 2023 median in the same release is $428,600. At 2025’s average hourly earnings that median is about 13,314 hours of work." }) },
        value: { a: cell("$360,600 on the 2024 survey", "acs-value", { year: 2024, note: "The latest reading the American Community Survey has published: universe all owner-occupied housing units, and the owner’s own estimate of what the property would sell for. It is the same year the tenure line above is read at, and it is 1.85 times the 2015 reading on the same instrument and the same universe. No work-time is shown: the value is a 2024 figure and the wage on this panel is 2025’s. The $417,400 on the home line above is a different thing again — the price a new house actually sold for, in 2025." }) },
        roof: { a: cell("Rent $1,487 a month; owner with a mortgage $2,035", "acs-rent", { year: 2024, srcs: ["acs-smoc", "freddie-pmms"], note: "Both are 2024 readings, the most recent the survey publishes; median selected monthly owner costs without a mortgage were $664. Both figures include utilities and fuels. What the loan behind the owner's figure costs in total can no longer be said on the same basis as the earlier panels: the federal survey that measured the average term, rate and loan amount was discontinued in 2019. For the panel's own year the 30-year fixed rate averaged 6.60 per cent across the year's 53 weekly readings — an offered rate on one product, not an average of loans closed, and not joined to the earlier line." }) },
        household: { a: cell("2.50 people; 57.2% of women in the labor force", "census-hh6", { year: 2025, srcs: ["cps-flfp", "census-ms2"], note: "The women’s figure is the June 2025 reading. Median age at first marriage: 30.8 for men, 28.4 for women." }) },
        transport: { a: cell("97,413 thousand automobiles registered in 2024", "fhwa-mv", { year: 2024, note: "The automobile column has been falling since the 2005 panel, where it read 136,568 thousand. What is on the road has not fallen; what the table calls a car has. The truck line below carries the other half of that." }) },
        basket: {
          a: {
            items: [
              { label: "a dozen eggs", price: 3.775, unit: "dozen", src: "bls-ap", year: 2025 },
              { label: "a gallon of milk", price: 4.029, unit: "gallon", src: "bls-ap", year: 2025 },
              { label: "a pound of butter", price: 4.872, unit: "pound", src: "bls-ap", year: 2025, note: "A different butter series from the one priced through 2005." },
              { label: "a pound of round steak", price: 8.457, unit: "pound", src: "bls-ap", year: 2025 },
              { label: "a pound of bread", price: 1.864, unit: "pound", src: "bls-ap", year: 2025 },
              { label: "a gallon of gasoline, unleaded regular", price: 3.257, unit: "gallon", src: "eia-gas", year: 2025 },
              { label: "a first-class stamp", price: 0.78, unit: "letter", src: "usps-rates", year: 2025, note: "78 cents from 13 July 2025; it had been 73 cents." }
            ]
          }
        },
        unemployment: { a: cell("4.4%", "cps-unemp", { year: 2025, note: "June 2025, on the unadjusted basis this line uses throughout; seasonally adjusted, June 2025 reads 4.1 per cent, so part of the gap against the 4.0 per cent 2024 annual average is seasonal. The June 2025 readings on this panel (unemployment 4.4, participation 57.2) are the not-seasonally-adjusted figures, construct-consistent with the annual averages carried on the earlier panels." }) },
        bills: { a: cell("$142.26 a month for electricity; 863 kilowatt-hours", "eia-861", { year: 2024, srcs: ["ce-1710"], note: "Across 143,144,185 residential customers in 2024, the most recent year the form publishes, at an average price of 16.48 cents a kilowatt-hour. Across the three panels that carry this line the bill rises from $88.60 to $142.26 while the average customer's monthly use falls from 938 kilowatt-hours to 863. The Consumer Expenditure Survey, counting the same ground a different way, puts the average consumer unit's whole utilities, fuels and public services bill at $4,736 for the year — $5,983 for owners with a mortgage and $3,049 for renters, the renter's figure sitting low partly because much of it is inside the rent." }) },
        saving: { a: cell("4.6% of disposable income", "bea-nipa21", { year: 2025, note: "The 2025 annual figure, published July 30, 2026; 2024 reads 5.4%. An accounting residual for households and the nonprofits serving them, not a survey of what families set aside." }) },
        homesize: { a: cell("2,142 square feet", "census-sqft", { year: 2025, note: "Median; the average was 2,378. The median had been 2,467 in 2015." }) },
        budget: { a: cell("Housing 33.4%, food 12.9% of $78,535 spent, 2024", "ce-1710", { year: 2024, note: "Housing $26,266, food $10,169, apparel and services $2,001, of average annual expenditures of $78,535 across 135,760 thousand consumer units; income before taxes averaged $104,207. These shares are computed here from the survey's dollar levels, not published as percentages by the Bureau. The lineage that opens on the 1900 panel ends at its 2002-03 wave, so this reading comes from a separate release and is not a tenth point on that series: what it shows is the same two categories, a century on, with housing taking a third of the money and food an eighth, where in 1901 food took two-fifths and housing under a quarter." }) },
        insurance: { a: cell("Health insurance $4,055 a year; vehicle insurance $1,993", "ce-1710", { year: 2024, srcs: ["bls-r991"], note: "Averages across all consumer units. Owners with a mortgage paid $5,041 for health insurance and renters $2,324. The survey also reports $9,797 under personal insurance and pensions, which is mostly pension and Social Security contributions rather than premiums and is not counted here as insurance. At the other end of the record the 1901 survey put healthcare and insurance together at $40 a year, 5.2 per cent of what the family spent; the two ends are 123 years and two instruments apart, and no line joins them." }) },
        power: { a: cell("863 kilowatt-hours a month", "eia-861", { year: 2024, note: "Average monthly consumption per residential customer across 143,144,185 customers in 2024, the most recent year the form publishes. It has fallen at each of the three panels that carry it — 938, 901, 863 — while the bill on those same panels rose from $88.60 to $142.26." }) },
        elecprice: { a: cell("16.48 cents a kilowatt-hour", "eia-861", { year: 2024, note: "The form’s own average price across all residential customers. In the money of the day it is the highest reading on this page; the lowest, 2.10 cents, is at 1970. Between the two sit two changes of instrument and a hundred and twenty-two years of dollars that are not the same dollars, so the pair is not a measurement of anything." }) },
        trucks: { a: cell("189,755 thousand trucks", "fhwa-mv", { year: 2024, note: "Against 97,413 thousand automobiles: nearly two trucks for every car, where in 1973 the register held fewer than one for every four. The table’s own classification break at the 2012 data year sits inside the stretch where the two columns swap places, so no year can be named as the one it happened, and how much of the swap is vehicles changing and how much is the classification changing is not something this table settles." }) },
        loan: { a: cell("the survey was discontinued in 2019", "fhfa-mirs", { absent: true, srcs: ["freddie-pmms"], note: "The Monthly Interest Rate Survey ran from 1963 to 2019 and the Federal Housing Finance Agency published its last one on 29 May 2019, in its own words “due to dwindling participation by financial institutions.” Nothing replaced it: no national average of contract rate, term to maturity, loan size and purchase price exists for a mortgage written in 2025, so this panel carries no payment, no term and no total. The nearest thing that still exists is Freddie Mac’s weekly survey, whose 2025 average was 6.60 per cent over 53 readings — but that is an OFFERED rate on one product to well-qualified borrowers with a fifth down, not an average of loans actually closed, and it carries no term and no loan size, so it cannot carry a total either." }) },
        electric: { a: cell("the column ends at 1956, at 98.8%", "hsus-s109", { absent: true, year: 1956, note: "The percentage-of-dwellings columns stop at 1956 and are dashes thereafter. No later national reading of this construct is printed here." }) },
        farmcity: { a: cell("the series ends at 1970", "hsus-n243", { absent: true, year: 1970, note: "The farm-and-nonfarm tenure table runs 1890 to 1970 and stops; its last reading sits on the 1973 panel." }) },
        service: { a: cell("the census table ends at 1970", "hsus-d182", { absent: true, year: 1970, note: "The major-occupation-group table runs 1900 to 1970 and stops; its last reading, 3.6 per cent, sits on the 1973 panel." }) }
      }
    }
  ];


  /* ------------------------------------------------------- matrix shorts */
  /* The century matrix cannot print sentences thirteen columns wide, so every
     cell carries a SHORT form as well as its display string. A short form only
     ever DROPS words from the display it abbreviates: the audit holds every
     numeral in it to appearing in that display, so the matrix can never
     introduce a digit the panel does not carry. The construct that governs a
     row -- whose average, from which survey, on which definition -- travels in
     the row header's own caveat rather than being repeated thirteen times, and
     every matrix cell links to the panel where the full reading lives. */

  var shorts = {
    "1900:occupation:a": "Farm work 37.5%",
    "1900:hours:a": "62.1 hours",
    "1900:earnings:a": "$487 a year",
    "1900:unemployment:a": "5.0%",
    "1900:income:a": "$749.50 average (1901)",
    "1900:saving:a": "no series yet",
    "1900:budget:a": "Housing 23.3% · food 42.5%",
    "1900:insurance:a": "Healthcare + insurance $40",
    "1900:home:a": "46.7% owned",
    "1900:value:a": "no national value collected",
    "1900:homesize:a": "no floor-area series",
    "1900:farmcity:a": "Farm 64.4% · city 36.5%",
    "1900:roof:a": "$179 a year (1901)",
    "1900:loan:a": "no survey of mortgage terms",
    "1900:electric:a": "8.0% of dwellings, 1907",
    "1900:power:a": "the meter column is blank",
    "1900:elecprice:a": "16.2 cents (1902)",
    "1900:bills:a": "no fuel census yet",
    "1900:household:a": "4.8 people · women 20.0%",
    "1900:service:a": "28.7% of women at work",
    "1900:transport:a": "8 thousand cars",
    "1900:trucks:a": "none on the register",
    "1915:occupation:a": "Farm work 30.9% (1910)",
    "1915:hours:a": "58.2 hours",
    "1915:earnings:a": "$661 a year",
    "1915:unemployment:a": "8.5%",
    "1915:income:a": "$1,518 average (1918-19)",
    "1915:saving:a": "no series yet",
    "1915:budget:a": "Housing 23.3% · food 38.2%",
    "1915:insurance:a": "no healthcare row in this wave",
    "1915:home:a": "45.9% owned (1910)",
    "1915:value:a": "no national value collected",
    "1915:homesize:a": "no floor-area series",
    "1915:farmcity:a": "Farm 62.8% · city 38.4% (1910)",
    "1915:roof:a": "$334 a year (1918-19)",
    "1915:loan:a": "no survey of mortgage terms",
    "1915:electric:a": "15.9% of dwellings, 1912",
    "1915:power:a": "264 kWh a year (1912)",
    "1915:elecprice:a": "9.10 cents (1912)",
    "1915:bills:a": "no fuel census yet",
    "1915:household:a": "4.5 people (1910)",
    "1915:service:a": "24.0% of women at work (1910)",
    "1915:transport:a": "2,332 thousand cars",
    "1915:trucks:a": "159 thousand trucks",
    "1929:occupation:a": "Farm work 21.2% (1930)",
    "1929:hours:a": "44.2 hours",
    "1929:earnings:a": "$1,543 a year",
    "1929:unemployment:a": "3.2%",
    "1929:income:a": "$2,335 average",
    "1929:saving:a": "4.7% of disposable income",
    "1929:budget:a": "no wave, 1918-33",
    "1929:insurance:a": "no wave, 1918-33",
    "1929:home:a": "47.8% owned (1930)",
    "1929:value:a": "$4,779 at the 1930 census",
    "1929:homesize:a": "no floor-area series",
    "1929:farmcity:a": "Farm 53.9% · city 46.0% (1930)",
    "1929:roof:a": "$27.15 a month rent in 1930",
    "1929:loan:a": "no survey of mortgage terms",
    "1929:electric:a": "67.9% of dwellings; farm 9.2%",
    "1929:power:a": "502 kWh a year",
    "1929:elecprice:a": "6.33 cents",
    "1929:bills:a": "no fuel census yet",
    "1929:household:a": "4.1 people (1930) · women 23.6%",
    "1929:service:a": "17.8% of women at work (1930)",
    "1929:transport:a": "23,121 thousand cars",
    "1929:trucks:a": "3,550 thousand trucks",
    "1929:occupation:b": "Operatives 18.4% (1940)",
    "1929:hours:b": "38.1 hours",
    "1929:earnings:b": "$1,086 a year",
    "1929:unemployment:b": "24.9%",
    "1929:income:b": "$1,524 average (1934-36)",
    "1929:saving:b": "−0.7% of disposable income",
    "1929:budget:b": "Housing 32.0% · food 33.6%",
    "1929:insurance:b": "Healthcare $59",
    "1929:home:b": "43.6% owned (1940)",
    "1929:value:b": "$2,938 at the 1940 census",
    "1929:homesize:b": "no floor-area series",
    "1929:farmcity:b": "Farm 53.2% · city 41.1% (1940)",
    "1929:roof:b": "$485 a year (1934-36)",
    "1929:loan:b": "no survey of mortgage terms",
    "1929:electric:b": "66.7% of dwellings; farm 11.8%",
    "1929:power:b": "600 kWh a year",
    "1929:elecprice:b": "5.52 cents",
    "1929:bills:b": "no fuel census yet",
    "1929:household:b": "3.8 people (1940) · women 25.8%",
    "1929:service:b": "18.1% of women at work (1940)",
    "1929:transport:b": "20,657 thousand cars",
    "1929:trucks:b": "3,457 thousand trucks",
    "1944:occupation:a": "Operatives 18.4% (1940)",
    "1944:hours:a": "45.2 hours",
    "1944:earnings:a": "$2,517 a year",
    "1944:unemployment:a": "1.2%",
    "1944:income:a": "$2,700 median, after taxes",
    "1944:saving:a": "27.9% of disposable income",
    "1944:budget:a": "no wartime wave in the lineage",
    "1944:insurance:a": "no wave, 1934-36 to 1950",
    "1944:home:a": "43.6% owned (1940)",
    "1944:value:a": "$2,938 at the 1940 census",
    "1944:homesize:a": "no floor-area series",
    "1944:farmcity:a": "Farm 53.2% · city 41.1% (1940)",
    "1944:roof:a": "Rent $27 a month (1940)",
    "1944:loan:a": "no survey of mortgage terms",
    "1944:electric:a": "84.0% of dwellings; farm 42.2%",
    "1944:power:a": "1,151 kWh a year",
    "1944:elecprice:a": "3.51 cents",
    "1944:bills:a": "Coal 54.7% (1940)",
    "1944:household:a": "3.8 people (1940) · women 36.3%",
    "1944:service:a": "18.1% of women at work (1940)",
    "1944:transport:a": "25,566 thousand cars",
    "1944:trucks:a": "4,760 thousand trucks",
    "1955:occupation:a": "Operatives 20.5% (1950)",
    "1955:hours:a": "40.7 hours",
    "1955:earnings:a": "$4,356 a year",
    "1955:unemployment:a": "4.4%",
    "1955:income:a": "$4,418 median",
    "1955:saving:a": "9.7% of disposable income",
    "1955:budget:a": "Housing 27.2% · food 29.7%",
    "1955:insurance:a": "Healthcare $197",
    "1955:home:a": "55.0% owned (1950)",
    "1955:value:a": "$7,354 (1950)",
    "1955:homesize:a": "no floor-area series",
    "1955:farmcity:a": "Farm 65.7% · city 53.4% (1950)",
    "1955:roof:a": "Rent $42 a month (1950)",
    "1955:loan:a": "no survey of mortgage terms",
    "1955:electric:a": "98.4% of dwellings; farm 94.4%",
    "1955:power:a": "2,773 kWh a year",
    "1955:elecprice:a": "2.65 cents",
    "1955:bills:a": "Coal 34.6% (1950)",
    "1955:household:a": "3.5 people (1950) · women 35.7%",
    "1955:service:a": "8.9% of women at work (1950)",
    "1955:transport:a": "52,145 thousand cars",
    "1955:trucks:a": "10,289 thousand trucks",
    "1965:occupation:a": "Operatives 17.3% (1960)",
    "1965:hours:a": "41.2 hours",
    "1965:earnings:a": "$6,389 a year",
    "1965:unemployment:a": "4.5%",
    "1965:income:a": "$6,957 median",
    "1965:saving:a": "11.5% of disposable income",
    "1965:budget:a": "Housing 29.5% · food 24.3%",
    "1965:insurance:a": "Healthcare $355",
    "1965:home:a": "61.9% owned (1960)",
    "1965:value:a": "$11,900 (1960)",
    "1965:homesize:a": "no floor-area series",
    "1965:farmcity:a": "Farm 73.8% · city 61.0% (1960)",
    "1965:roof:a": "Rent $71 a month (1960)",
    "1965:loan:a": "$109 a month, 22.6 years",
    "1965:electric:a": "series ends 1956, 98.8%",
    "1965:power:a": "4,933 kWh a year",
    "1965:elecprice:a": "2.25 cents",
    "1965:bills:a": "Gas 43.1% (1960)",
    "1965:household:a": "3.4 people (1960) · women 39.3%",
    "1965:service:a": "7.9% of women at work (1960)",
    "1965:transport:a": "75,258 thousand cars",
    "1965:trucks:a": "14,786 thousand trucks",
    "1973:occupation:a": "Manufacturing 24.2%",
    "1973:hours:a": "36.9 hours",
    "1973:earnings:a": "$152.71 a week",
    "1973:unemployment:a": "4.9%",
    "1973:income:a": "$10,510 median household",
    "1973:saving:a": "13.5% of disposable income",
    "1973:budget:a": "Housing 30.8% · food 19.3%",
    "1973:insurance:a": "Healthcare $528",
    "1973:home:a": "64.5% owned",
    "1973:value:a": "$17,000 at the 1970 census",
    "1973:homesize:a": "1,525 square feet",
    "1973:farmcity:a": "Farm 80.5% · city 62.0% (1970)",
    "1973:roof:a": "Rent $108 a month (1970)",
    "1973:loan:a": "$189 a month, 24.0 years",
    "1973:electric:a": "series ends 1956, 98.8%",
    "1973:power:a": "7,066 kWh a year (1970)",
    "1973:elecprice:a": "2.10 cents (1970)",
    "1973:bills:a": "Gas 55.2% (1970)",
    "1973:household:a": "3.01 people · women 44.7%",
    "1973:service:a": "3.6% of women at work (1970)",
    "1973:transport:a": "101,985 thousand cars",
    "1973:trucks:a": "23,244 thousand trucks",
    "1985:occupation:a": "Manufacturing 18.3%",
    "1985:hours:a": "34.9 hours",
    "1985:earnings:a": "$304.37 a week",
    "1985:unemployment:a": "7.2%",
    "1985:income:a": "$23,620 median household",
    "1985:saving:a": "9.1% of disposable income",
    "1985:budget:a": "Housing 30.4% · food 15.0%",
    "1985:insurance:a": "Healthcare $1,049",
    "1985:home:a": "63.9% owned",
    "1985:value:a": "$47,200 at the 1980 census",
    "1985:homesize:a": "1,605 square feet",
    "1985:farmcity:a": "the series ends at 1970",
    "1985:roof:a": "Rent $243 a month (1980)",
    "1985:loan:a": "$692 a month, 25.9 years",
    "1985:electric:a": "series ends 1956, 98.8%",
    "1985:power:a": "no reading after 1970",
    "1985:elecprice:a": "8.5 cents",
    "1985:bills:a": "Gas 53.1% (1980)",
    "1985:household:a": "2.69 people · women 54.5%",
    "1985:service:a": "the census table ends at 1970",
    "1985:transport:a": "127,885 thousand cars",
    "1985:trucks:a": "43,210 thousand trucks",
    "1995:occupation:a": "Manufacturing 14.7%",
    "1995:hours:a": "34.3 hours",
    "1995:earnings:a": "$399.93 a week",
    "1995:unemployment:a": "5.6%",
    "1995:income:a": "$34,080 median household",
    "1995:saving:a": "6.8% of disposable income",
    "1995:budget:a": "Housing 32.1% · food 13.8%",
    "1995:insurance:a": "Healthcare $1,806",
    "1995:home:a": "64.7% owned",
    "1995:value:a": "$79,100 at the 1990 census",
    "1995:homesize:a": "1,920 square feet",
    "1995:farmcity:a": "the series ends at 1970",
    "1995:roof:a": "Rent $447 a month (1990)",
    "1995:loan:a": "$806 a month, 27.4 years",
    "1995:electric:a": "series ends 1956, 98.8%",
    "1995:power:a": "no reading after 1970",
    "1995:elecprice:a": "9.8 cents",
    "1995:bills:a": "Gas 51.0% (1990)",
    "1995:household:a": "2.65 people · women 58.9%",
    "1995:service:a": "the census table ends at 1970",
    "1995:transport:a": "128,387 thousand cars",
    "1995:trucks:a": "72,458 thousand trucks",
    "2005:occupation:a": "Manufacturing 10.6%",
    "2005:hours:a": "33.8 hours",
    "2005:earnings:a": "$543.91 a week",
    "2005:unemployment:a": "5.1%",
    "2005:income:a": "$46,330 median household",
    "2005:saving:a": "2.2% of disposable income",
    "2005:budget:a": "Housing 32.8% · food 13.1%",
    "2005:insurance:a": "Healthcare $2,384",
    "2005:home:a": "69.0% owned (2004)",
    "2005:value:a": "$119,600 (2000) · $167,500 (2005)",
    "2005:homesize:a": "2,227 square feet",
    "2005:farmcity:a": "the series ends at 1970",
    "2005:roof:a": "Rent $728 · owner $1,295",
    "2005:loan:a": "$1,275 a month, 28.5 years",
    "2005:electric:a": "series ends 1956, 98.8%",
    "2005:power:a": "938 kWh a month",
    "2005:elecprice:a": "9.45 cents",
    "2005:bills:a": "$88.60 a month",
    "2005:household:a": "2.57 people · women 59.3%",
    "2005:service:a": "the census table ends at 1970",
    "2005:transport:a": "136,568 thousand cars",
    "2005:trucks:a": "103,819 thousand trucks",
    "2015:occupation:a": "Manufacturing 8.7%",
    "2015:hours:a": "33.7 hours",
    "2015:earnings:a": "$708.73 a week",
    "2015:unemployment:a": "5.3%",
    "2015:income:a": "$56,520 median household",
    "2015:saving:a": "5.8% of disposable income",
    "2015:budget:a": "Housing 32.9% · food 12.5%",
    "2015:insurance:a": "Health ins. $2,977 · vehicle $1,079",
    "2015:home:a": "63.7% owned",
    "2015:value:a": "$194,500 on the 2015 survey",
    "2015:homesize:a": "2,467 square feet",
    "2015:farmcity:a": "the series ends at 1970",
    "2015:roof:a": "Rent $959 · owner $1,477",
    "2015:loan:a": "$1,500 a month, 28.4 years",
    "2015:electric:a": "series ends 1956, 98.8%",
    "2015:power:a": "901 kWh a month",
    "2015:elecprice:a": "12.65 cents",
    "2015:bills:a": "$114.03 a month",
    "2015:household:a": "2.54 people · women 56.7%",
    "2015:service:a": "the census table ends at 1970",
    "2015:transport:a": "112,864 thousand cars",
    "2015:trucks:a": "141,256 thousand trucks",
    "2025:occupation:a": "Manufacturing 7.9%",
    "2025:hours:a": "33.7 hours",
    "2025:earnings:a": "$1,055.51 a week",
    "2025:unemployment:a": "4.4%",
    "2025:income:a": "$83,730 median household (2024)",
    "2025:saving:a": "4.6% of disposable income",
    "2025:budget:a": "Housing 33.4% · food 12.9%",
    "2025:insurance:a": "Health ins. $4,055 · vehicle $1,993",
    "2025:home:a": "65.6% owned (2024)",
    "2025:value:a": "$360,600 on the 2024 survey",
    "2025:homesize:a": "2,142 square feet",
    "2025:farmcity:a": "the series ends at 1970",
    "2025:roof:a": "Rent $1,487 · owner $2,035",
    "2025:loan:a": "survey ended 2019",
    "2025:electric:a": "series ends 1956, 98.8%",
    "2025:power:a": "863 kWh a month",
    "2025:elecprice:a": "16.48 cents",
    "2025:bills:a": "$142.26 a month",
    "2025:household:a": "2.50 people · women 57.2%",
    "2025:service:a": "the census table ends at 1970",
    "2025:transport:a": "97,413 thousand cars (2024)",
    "2025:trucks:a": "189,755 thousand trucks"
  };

  for (var shortKey in shorts) {
    if (!shorts.hasOwnProperty(shortKey)) { continue; }
    var sk = shortKey.split(":");
    for (var si = 0; si < eras.length; si++) {
      if (eras[si].id !== sk[0]) { continue; }
      var sc = eras[si].cells[sk[1]];
      if (sc && sc[sk[2]]) { sc[sk[2]].short = shorts[shortKey]; }
    }
  }

  W.registers["american-household"] = {
    schema: 1,
    edition: {
      id: "american-household",
      title: "An American household, 1900–2025",
      place: "the United States",
      period: "1900 to 2025",
      stratum: "the household in the middle of the record, as each era's own survey defines it",
      built: "Twelve panels: 1900, 1915, 1929 with 1933 beside it, 1944, 1955, 1965, 1973, 1985, 1995, 2005, 2015 and 2025.",
      selectionRule: "Eras are decadal where the century is quiet and anchored at documented breaks where it is not. The panels are 1900, 1915, 1929 with 1933 beside it, 1944, 1955, 1965, 1973, 1985, 1995, 2005, 2015 and 2025."
    },
    format: {
      symbol: "$",
      minorWord: "cents",
      moneyLabel: "dollars",
      timeLabel: "hours of work",
      hourLead: "An hour of work"
    },
    groups: groups,
    sources: sources,
    wage: wage,
    lines: lines,
    eras: eras
  };
})();
