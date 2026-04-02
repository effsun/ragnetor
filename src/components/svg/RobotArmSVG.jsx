export default function RobotArmSVG() {
  return (
    <svg
      viewBox="0 0 320 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#e8c53a"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* BASE PLATFORM */}
      <polygon points="110,460 210,460 220,440 100,440" opacity="0.9" />
      <line x1="100" y1="440" x2="220" y2="440" />
      <line x1="160" y1="440" x2="160" y2="420" />

      {/* LOWER ARM */}
      <polygon points="145,420 175,420 185,300 135,300" />
      <line x1="160" y1="420" x2="155" y2="300" />
      <line x1="160" y1="420" x2="165" y2="300" />
      <line x1="148" y1="400" x2="172" y2="360" />
      <line x1="172" y1="400" x2="148" y2="360" />
      <line x1="148" y1="360" x2="172" y2="320" />
      <line x1="172" y1="360" x2="148" y2="320" />

      {/* ELBOW JOINT */}
      <circle cx="160" cy="298" r="18" opacity="0.8" />
      <circle cx="160" cy="298" r="8" />
      <line x1="143" y1="290" x2="177" y2="306" />
      <line x1="143" y1="306" x2="177" y2="290" />

      {/* UPPER ARM */}
      <polygon points="155,290 175,292 210,170 190,165" />
      <line x1="165" y1="290" x2="200" y2="167" />
      <line x1="158" y1="270" x2="200" y2="220" />
      <line x1="172" y1="278" x2="195" y2="200" />
      <line x1="162" y1="240" x2="204" y2="195" />

      {/* SHOULDER JOINT */}
      <circle cx="202" cy="162" r="22" opacity="0.8" />
      <circle cx="202" cy="162" r="10" />
      <line x1="182" y1="148" x2="222" y2="176" />
      <line x1="182" y1="176" x2="222" y2="148" />

      {/* FOREARM */}
      <polygon points="192,152 214,156 190,50 172,52" />
      <line x1="203" y1="154" x2="181" y2="51" />
      <line x1="195" y1="135" x2="183" y2="80" />
      <line x1="210" y1="120" x2="180" y2="75" />

      {/* WRIST JOINT */}
      <circle cx="180" cy="46" r="16" opacity="0.9" />
      <circle cx="180" cy="46" r="6" />

      {/* GRIPPER / CLAW */}
      <polygon points="165,40 195,40 202,20 158,20" />
      <polyline points="162,20 152,8 142,14 150,24" />
      <polyline points="170,20 166,4 156,6 158,18" />
      <polyline points="180,20 178,2 168,4 168,18" />
      <polyline points="190,20 194,6 182,4 180,18" />
      <polyline points="200,28 216,18 210,8 198,16" />

      {/* DETAILS */}
      <circle cx="152" cy="380" r="3" />
      <circle cx="168" cy="380" r="3" />
      <circle cx="152" cy="340" r="3" />
      <circle cx="168" cy="340" r="3" />
      <line x1="148" y1="415" x2="172" y2="415" />
      <line x1="148" y1="305" x2="172" y2="305" />
      <polygon points="160,282 168,286 168,294 160,298 152,294 152,286" />
      <path
        d="M155,290 Q130,260 140,220 Q150,180 190,170"
        strokeDasharray="4 4"
        opacity="0.4"
      />
    </svg>
  )
}
