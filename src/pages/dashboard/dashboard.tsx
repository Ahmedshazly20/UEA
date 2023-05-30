import { FC } from "react";
import circleSVG from "../../assets/images/dashboard/circle.svg";
import face1 from "../../assets/images/faces/face1.jpg";

export const DashboardPage: FC<{}> = () => {
  return (
    <>
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-home"></i>
          </span>{" "}
          Dashboard
        </h3>
      </div>

      <div className="row">
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-danger card-img-holder text-white">
            <div className="card-body">
              <img
                src={circleSVG}
                className="card-img-absolute"
                alt="circle-image"
              />
              <h4 className="font-weight-normal mb-3">
                Weekly Sales{" "}
                <i className="mdi mdi-chart-line mdi-24px float-right"></i>
              </h4>
              <h2 className="mb-5">AED 15,0000</h2>
              <h6 className="card-text">Increased by 60%</h6>
            </div>
          </div>
        </div>
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-info card-img-holder text-white">
            <div className="card-body">
              <img
                src={circleSVG}
                className="card-img-absolute"
                alt="circle-image"
              />
              <h4 className="font-weight-normal mb-3">
                Weekly Orders{" "}
                <i className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
              </h4>
              <h2 className="mb-5">45,6334</h2>
              <h6 className="card-text">Decreased by 10%</h6>
            </div>
          </div>
        </div>
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-success card-img-holder text-white">
            <div className="card-body">
              <img
                src={circleSVG}
                className="card-img-absolute"
                alt="circle-image"
              />
              <h4 className="font-weight-normal mb-3">
                Visitors Online{" "}
                <i className="mdi mdi-diamond mdi-24px float-right"></i>
              </h4>
              <h2 className="mb-5">95,5741</h2>
              <h6 className="card-text">Increased by 5%</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Recent Tickets</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th> Assignee </th>
                      <th> Subject </th>
                      <th> Status </th>
                      <th> Last Update </th>
                      <th> Tracking ID </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <img src={face1} className="me-2" alt="image" /> David
                        Grey
                      </td>
                      <td> Fund is not recieved </td>
                      <td>
                        <label className="badge badge-gradient-success">
                          DONE
                        </label>
                      </td>
                      <td> Dec 5, 2017 </td>
                      <td> WD-12345 </td>
                    </tr>
                    <tr>
                      <td>
                        <img src={face1} className="me-2" alt="image" /> Stella
                        Johnson
                      </td>
                      <td> High loading time </td>
                      <td>
                        <label className="badge badge-gradient-warning">
                          PROGRESS
                        </label>
                      </td>
                      <td> Dec 12, 2017 </td>
                      <td> WD-12346 </td>
                    </tr>
                    <tr>
                      <td>
                        <img src={face1} className="me-2" alt="image" /> Marina
                        Michel
                      </td>
                      <td> Website down for one week </td>
                      <td>
                        <label className="badge badge-gradient-info">
                          ON HOLD
                        </label>
                      </td>
                      <td> Dec 16, 2017 </td>
                      <td> WD-12347 </td>
                    </tr>
                    <tr>
                      <td>
                        <img src={face1} className="me-2" alt="image" /> John
                        Doe
                      </td>
                      <td> Loosing control on server </td>
                      <td>
                        <label className="badge badge-gradient-danger">
                          REJECTED
                        </label>
                      </td>
                      <td> Dec 3, 2017 </td>
                      <td> WD-12348 </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
// function TestPage1({ query }: { query: string | null }) {
//   return <></>;
// }
// export const TesPage: FC<{ query?: string | null }> = ({ query }) => {
//   return <></>;
// };
// export function useItems() {
//   const [searchParams] = useSearchParams();
//   console.log("item", new Date().toString(), searchParams.get("query"));
// }
