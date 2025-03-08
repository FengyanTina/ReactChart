export const data = {
    name: "Root",
    children: [
      {
        name: "January",
        children: [
          {
            name: "Depart1",
            children: [
              { name: "t1", value: 10 },
              { name: "t2", value: 20 },
            ],
          },
          {
            name: "Depart2",
            children: [
              { name: "t1", value: 10 },
              { name: "t2", value: 20 },
              { name: "t3", value: 30 },
            ],
          },
        ],
      },
      {
        name: "February",
        children: [
          {
            name: "Depart1",
            children: [
              { name: "t1", value: 10 },
              { name: "t2", value: 20 },
              { name: "t3", value: 30 },
            ],
          },
          {
            name: "Depart2",
            children: [
              { name: "t1", value: 10 },
              { name: "t2", value: 20 },
              { name: "t3", value: 30 },
            ],
          },
          {
            name: "Depart3",
            children: [
              { name: "t1", value: 10 },
              { name: "t2", value: 20 },
              { name: "t3", value: 30 },
            ],
          },
        ],
      },
  
      {
        name: "March",
        children: [
          {
            name: "Depart1",
            children: [
              { name: "t1", value: 10 },
              { name: "t2", value: 20 },
              { name: "t3", value: 30 },
            ],
          },
          {
            name: "Depart2",
            children: [
              { name: "t1", value: 10 },
              { name: "t2", value: 20 },
              { name: "t3", value: 30 },
            ],
          },
          {
            name: "Depart3",
            children: [
              { name: "t1", value: 10 },
              { name: "t2", value: 20 },
              { name: "t3", value: 30 },
            ],
          },
        ],
      },
    ],
  };



  export interface Node {
    name: string;
    value?: number;
    time?: number;
    estimateTime?: number; // Example: Which department this task belongs to
    status?: "pending" | "in-progress" | "completed"; // Example: Task status
    priority?: number;
    children?: Node[];
  }
  
  // Sorting function for months
  
  export const BKS: Node = {
    name: "2025",
value:320,
    estimateTime:125,
    time: 125,
    children: [
      {
        name: "Januari",
        value: 17,
        estimateTime: 6,
        time: 5,
        children: [
          {
            name: "Ekonomi",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
          {
            name: "Arbetsgivaransvar",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
          {
            name: "Ledning och uppföljning",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
          {
            name: "Arbetsmiljö",
            value: 5,
            estimateTime: 6,
            time: 5,
            children: [
              {
                name: "uppföljning riskbedömningar",
                value: 5,
                estimateTime: 6,
                time: 5,
              },
            ],
          },
          {
            name: "Styrelsen",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
        ],
      },
      {
        name: "Februari", // 2月
        value: 34,
        estimateTime: 20,
        time: 20,
        children: [
          {
            name: "Ekonomi",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
          {
            name: "Arbetsgivaransvar",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
          {
            name: "Ledning och uppföljning",
            value: 10,
            estimateTime: 10,
            time: 10,
            children: [
              { name: "Uppföljning klagomålshantering", value: 10, time: 10 },
            ],
          },
          {
            name: "Arbetsmiljö",
            value: 15,
            estimateTime: 15,
            time: 15,
            children: [
              {
                name: "uppföljning bransdskydd",
                value: 5,
                estimateTime: 5,
                time: 5,
              },
              {
                name: "uppföljning fysiska skyddsronder",
                value: 10,
                estimateTime: 10,
                time: 10,
              },
            ],
          },
          {
            name: "Styrelsen",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
        ],
      },
      {
        name: "Mars",
        value: 48,
        estimateTime: 45,
        time: 45,
        children: [
          {
            name: "Ekonomi",
            value: 10,
            estimateTime: 10,
            time: 10,
            children: [
              {
                name: "Diskussion budget för nästa läsår",
                value: 10,
                estimateTime: 10,
                time: 10,
              },
            ],
          },
          {
            name: "Arbetsgivaransvar",
            value: 10,
            estimateTime: 10,
            time: 10,
            children: [
              { name: "lönerevision Vision", value: 5, estimateTime: 5, time: 5 },
              {
                name: "Medarbetarsamtal skolledningen",
                value: 5,
                estimateTime: 5,
                time: 5,
              },
            ],
          },
          {
            name: "Ledning och uppföljning",
            value: 10,
            estimateTime: 10,
            time: 10,
            children: [
              {
                name: "Genomgång delårsrapport",
                value: 10,
                estimateTime: 10,
                time: 10,
              },
            ],
          },
          {
            name: "Arbetsmiljö",
            value: 15,
            estimateTime: 15,
            time: 15,
            children: [
              {
                name: "uppföljning bransdskydd",
                value: 5,
                estimateTime: 5,
                time: 5,
              },
              {
                name: "uppföljning fysiska skyddsronder",
                value: 10,
                estimateTime: 10,
                time: 10,
              },
            ],
          },
          {
            name: "Styrelsen",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
        ],
      },
      {
        name: "April",
        value: 22,
        estimateTime: 20,
        time: 20,
        children: [
          {
            name: "Ekonomi",
            value: 10,
            estimateTime: 10,
            time: 10,
            children: [
              {
                name: "1a utkast budget inför nästa läsår",
                value: 10,
                estimateTime: 10,
                time: 10,
              },
            ],
          },
          {
            name: "Arbetsgivaransvar",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
          {
            name: "Ledning och uppföljning",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
          {
            name: "Arbetsmiljö",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
          {
            name: "Styrelsen",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
        ],
      },
      {
        name: "Maj",
        value: 29,
        estimateTime: 10,
        time: 10,
        children: [
          {
            name: "Ekonomi",
            value: 10,
            estimateTime: 10,
            time: 10,
            children: [
              {
                name: "förslag budget inför nästa läsår",
                value: 10,
                estimateTime: 10,
                time: 10,
              },
            ],
          },
          {
            name: "Arbetsgivaransvar",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
          {
            name: "Ledning och uppföljning",
            value: 10,
            estimateTime: 10,
            time: 10,
            children: [
              {
                name: "Uppföljning kristna profilen",
                value: 10,
                estimateTime: 10,
                time: 10,
              },
            ],
          },
          {
            name: "Arbetsmiljö",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
          {
            name: "Styrelsen",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
        ],
      },
      {
        name: "Juni",
        value: 32,
        estimateTime: 20,
        time: 20,
        children: [
          {
            name: "Ekonomi",
            value: 20,
            estimateTime: 20,
            time: 20,
            children: [
              { name: "Beslut budget", value: 10, estimateTime: 10, time: 10 },
              {
                name: "Boka styrelsemöten kommande verksamhetsår",
                value: 10,
                estimateTime: 10,
                time: 10,
              },
            ],
          },
          {
            name: "Arbetsgivaransvar",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
          {
            name: "Ledning och uppföljning",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
          {
            name: "Arbetsmiljö",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
          {
            name: "Styrelsen",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
        ],
      },
      {
        name: "Juli",
        value: 15,
        estimateTime: 0,
        time: 0,
        children: [
          {
            name: "Ekonomi",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
          {
            name: "Arbetsgivaransvar",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
          {
            name: "Ledning och uppföljning",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
          {
            name: "Arbetsmiljö",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
          {
            name: "Styrelsen",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
        ],
      },
      {
        name: "Augusti",
        value: 34,
        estimateTime: 25,
        time: 25,
        children: [
          {
            name: "Ekonomi",
            value: 15,
            estimateTime: 15,
            time: 15,
            children: [
              {
                name: "Prognos barn o elever",
                value: 4,
                estimateTime: 5,
                time: 5,
              },
              {
                name: "uppföljning budget aktuellt läge",
                value: 6,
                estimateTime: 5,
                time: 5,
              },
              {
                name: "Prognos bokslut föreg. läsår",
                value: 5,
                estimateTime: 5,
                time: 5,
              },
            ],
          },
          {
            name: "Arbetsgivaransvar",
            value: 10,
            estimateTime: 10,
            time: 10,
            children: [
              {
                name: "delegation till rektor och ev. övr",
                value: 10,
                estimateTime: 10,
                time: 10,
              },
            ],
          },
          {
            name: "Ledning och uppföljning",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
          {
            name: "Arbetsmiljö",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
          {
            name: "Styrelsen",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
        ],
      },
      {
        name: "September",
        value: 30,
        estimateTime: 24,
        time: 24,
        children: [
          {
            name: "Ekonomi",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
          {
            name: "Arbetsgivaransvar",
            value: 10,
            estimateTime: 10,
            time: 10,
            children: [
              {
                name: "lönerevision Sveriges Lärare",
                value: 10,
                estimateTime: 10,
                time: 10,
              },
            ],
          },
          {
            name: "Ledning och uppföljning",
            value: 4,
            estimateTime: 4,
            time: 4,
            children: [
              {
                name: "uppföljning elevhälsoarbetet",
                value: 4,
                estimateTime: 4,
                time: 4,
              },
            ],
          },
          {
            name: "Arbetsmiljö",
            value: 10,
            estimateTime: 10,
            time: 10,
            children: [
              {
                name: "uppföljning tillbud och olyckor",
                value: 10,
                estimateTime: 10,
                time: 10,
              },
            ],
          },
          {
            name: "Styrelsen",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [
                { 
                    name: "No task", 
                    value: 3, 
                    time: 0 }
            ],
          },
        ],
      },
      {
        name: "Oktober",
        value: 17,
        estimateTime: 5,
        time: 5,
        children: [
          {
            name: "Ekonomi",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
          {
            name: "Arbetsgivaransvar",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
          {
            name: "Ledning och uppföljning",
            value: 5,
            estimateTime: 5,
            time: 5,
            children: [
              {
                name: "Genomgång helårsrapport",
                value: 5,
                estimateTime: 5,
                time: 5,
              },
            ],
          },
          {
            name: "Arbetsmiljö",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
          {
            name: "Styrelsen",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
        ],
      },
      {
        name: "November",
        value: 17,
        estimateTime: 8,
        time: 8,
        children: [
          {
            name: "Ekonomi",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
          {
            name: "Arbetsgivaransvar",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
          {
            name: "Ledning och uppföljning",
            value: 4,
            estimateTime: 4,
            time: 4,
            children: [
              {
                name: "Uppföljning incidenter",
                value: 4,
                estimateTime: 4,
                time: 4,
              },
            ],
          },
          {
            name: "Arbetsmiljö",
            value: 4,
            estimateTime: 4,
            time: 4,
            children: [
              { name: "uppföljning personalfrånvaro", value: 4, time: 4 },
            ],
          },
          {
            name: "Styrelsen",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
        ],
      },
      {
        name: "December",
        value: 25,
        estimateTime: 29,
        time: 29,
        children: [
          {
            name: "Ekonomi",
            value: 10,
            estimateTime: 10,
            time: 10,
            children: [
              {
                name: "Årsboksut från revisor signering",
                value: 10,
                estimateTime: 10,
                time: 10,
              },
            ],
          },
          {
            name: "Arbetsgivaransvar",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
          {
            name: "Ledning och uppföljning",
            value: 4,
            estimateTime: 4,
            time: 4,
            children: [{ name: "Uppföljning incidenter", value: 4,estimateTime: 4, time: 4 }],
          },
          {
            name: "Arbetsmiljö",
            value: 5,
            estimateTime: 5,
            time: 5,
            children: [{ name: "enkät arbetsmiljö", value: 5, estimateTime: 5,time: 5 }],
          },
          {
            name: "Styrelsen",
            value: 3,
            estimateTime: 0,
            time: 0,
            children: [{ name: "No task", value: 3, time: 0 }],
          },
        ],
      },
    ],
  };
  export const dataset = [
    {
      Ekonomi: 45,
      Arbetsgivaransvar: 36,
      lU: 20,
      Arbetsmiljö: 53,
      Styrelsen: 51,
      month: 'Jan',
    },
    {
      Ekonomi: 35,
      Arbetsgivaransvar: 30,
      lU: 18,
      Arbetsmiljö: 35,
      Styrelsen: 32,
      month: 'Feb',
    },
    {
      Ekonomi: 35,
      Arbetsgivaransvar: 31,
      lU: 19,
      Arbetsmiljö: 36,
      Styrelsen: 33,
      month: 'Mar',
    },
    {
      Ekonomi: 36,
      Arbetsgivaransvar: 32,
      lU: 20,
      Arbetsmiljö: 37,
      Styrelsen: 33,
      month: 'Apr',
    },
    {
      Ekonomi: 37,
      Arbetsgivaransvar: 33,
      lU: 21,
      Arbetsmiljö: 37,
      Styrelsen: 34,
      month: 'May',
    },
    {
      Ekonomi: 38,
      Arbetsgivaransvar: 34,
      lU: 22,
      Arbetsmiljö: 37,
      Styrelsen: 34,
      month: 'June',
    },
    {
      Ekonomi: 39,
      Arbetsgivaransvar: 35,
      lU: 23,
      Arbetsmiljö: 38,
      Styrelsen: 35,
      month: 'July',
    },
    {
      Ekonomi: 50,
      Arbetsgivaransvar: 36,
      lU: 24,
      Arbetsmiljö: 28,
      Styrelsen: 35,
      month: 'Aug',
    },
    {
      Ekonomi: 30,
      Arbetsgivaransvar: 30,
      lU: 25,
      Arbetsmiljö: 39,
      Styrelsen: 20,
      month: 'Sept',
    },
    {
      Ekonomi: 42,
      Arbetsgivaransvar: 38,
      lU: 26,
      Arbetsmiljö: 39,
      Styrelsen: 36,
      month: 'Oct',
    },
    {
      Ekonomi: 43,
      Arbetsgivaransvar: 39,
      lU: 27,
      Arbetsmiljö: 40,
      Styrelsen: 37,
      month: 'Nov',
    },
    {
      Ekonomi: 44,
      Arbetsgivaransvar: 40,
      lU: 28,
      Arbetsmiljö: 40,
      Styrelsen: 37,
      month: 'Dec',
    },
  ];
  
  export function valueFormatter(value: number | null) {
    return `${value}mm`;
  }