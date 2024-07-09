import Link from "@docusaurus/Link";
import ShortenDesc from "./ShortenDesc";
import ElnCard from "./ElnCard";
import styles from "./Eln.module.css";

function ElnStack({ elnTable }) {
    return (
        <div className={styles.eln}>
            {elnTable.map((eln, idx) => (
                <ElnCard {...{ eln }} key={idx} />
            ))}
        </div>
    );
}

export default ElnStack;

// <table>
//     <thead>
//         <tr>
//             <th>Name</th>
//             <th>License</th>
//             <th>Description</th>
//         </tr>
//     </thead>
//     <tbody>
//         {elnTable.map((eln) => (
//             <tr>
//                 <td>
//                     <Link to={eln.url}>{eln.name}</Link>
//                 </td>
//                 <td>
//                     {eln.license === "Open Source" ? (
//                         <strong>{eln.license}</strong>
//                     ) : (
//                         eln.license
//                     )}
//                 </td>
//                 <td>
//                     <ShortenDesc desc={eln.desc} length={200} />
//                 </td>
//             </tr>
//         ))}
//     </tbody>
// </table>
