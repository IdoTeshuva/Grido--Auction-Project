import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Skeleton
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ChairIcon from "@mui/icons-material/Chair";
import PendingIcon from "@mui/icons-material/Pending";
import CableIcon from "@mui/icons-material/Cable";
import BlenderIcon from "@mui/icons-material/Blender";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import axios from "axios";
import Bid from "./Bid";

import "./item.css";
const { useEffect } = require("react");
const { useState } = require("react");
const api = axios.create({
  baseURL: "http://www.localhost:3000",
});

const Items = ({ username, setUsername, isAdmin, setIsAdmin }) => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState("");
  const [counter, setCounter] = useState(0);
  const [openForm, setOpenForm] = useState(false);
  const [selectCatefory, setSelectCategory] = useState();
  const [endSale, setEndSale] = useState(false);

  const GetItems = () => {
        api.get("/items").then((res) => {
            setItems(res.data);
        });
  };
  const PostItem = () => {
    api.post("/items", item).then((res) => {
      const newItemsList = [...items];
      newItemsList.push(res.data);
      setItems(newItemsList);
    });
  };

  useEffect(() => {
    setTimeout(() => {

    GetItems();
}, 3000);

  }, []);

  return (
    <div>
      <h1 className="our-prod">Our Products</h1>
      {!username && (
        <h4 className="please-login">
          You must login to post and bid products
        </h4>
      )}
      {username ? (
        <Button
          className="add-icon"
          onClick={() => setOpenForm(!openForm)}
          variant="contained"
        >
          {openForm ? <CloseIcon /> : <AddIcon />}
        </Button>
      ) : (
        <Button
          className="add-icon"
          disabled
          onClick={() => setOpenForm(!openForm)}
          color="primary"
          aria-label="add"
        >
          {openForm ? <CloseIcon /> : <AddIcon />}
        </Button>
      )}
      <br />
      <br />
      {openForm && (
        <div>
          <TextField
            size="small"
            placeholder="Title"
            onChange={(e) => setItem({ ...item, title: e.target.value })}
            value={item && item.title}
          />
          <TextField
            size="small"
            placeholder="Description"
            onChange={(e) => setItem({ ...item, description: e.target.value })}
            value={item && item.description}
          />
          <TextField
            size="small"
            placeholder="Price"
            onChange={(e) => setItem({ ...item, firstPrice: e.target.value })}
            value={item && item.firstPrice}
          />
          <br />
          <br />
          <TextField
            size="small"
            placeholder="Image URL"
            onChange={(e) => setItem({ ...item, image: e.target.value })}
            value={item && item.image}
          />
          <FormControl>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              className="select-bar"
              size="small"
              label="Category"
              onChange={(e) => setItem({ ...item, category: e.target.value })}
              value={item && item.category}
            >
              <MenuItem value={"Furniture"}>
                <ChairIcon />
                Furniture
              </MenuItem>
              <MenuItem value={"Electornics"}>
                <CableIcon />
                Electornics
              </MenuItem>
              <MenuItem value={"Housewares"}>
                <BlenderIcon />
                Housewares
              </MenuItem>
              <MenuItem value={"Other"}>
                <PendingIcon />
                Other
              </MenuItem>
            </Select>
          </FormControl>

          <TextField
            size="small"
            type="date"
            placeholder="End Auction"
            onChange={(e) => setItem({ ...item, endAuction: e.target.value })}
            value={item && item.endAuction}
          />

          <br />
          <br />
          <Button variant="outlined" onClick={PostItem}>
            Post Your Product
          </Button>
        </div>
      )}
      <FormControl>
        <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
        <Select
          className="filter-bar"
          size="small"
          label="Select Category"
          onChange={(e) => setSelectCategory(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Furniture">
            <ChairIcon />
            Furniture
          </MenuItem>
          <MenuItem value="Electornics">
            <CableIcon />
            Electornics
          </MenuItem>
          <MenuItem value="Housewares">
            <BlenderIcon />
            Housewares
          </MenuItem>
          <MenuItem value="Other">
            <PendingIcon />
            Other
          </MenuItem>
        </Select>
      </FormControl>
      <div className="items">
        {items.length>0 ?
          items
            .filter((item) =>
              selectCatefory ? item.category === selectCatefory : items
            )
            .map((data, index) => {
              if (data.endAuction <= new Date().toISOString().split("T")[0]) {
                return (
                  <div className="item" key={index}>
                    <img
                      className="item-img"
                      src={data.image}
                      alt=""
                    />
                    <h1 className="item-title">{data.title}</h1>
                    <h5 className="item-desc">{data.description}</h5>
                    <span className="sold">
                      <ErrorIcon /> SOLD{" "}
                    </span>
                    <p className="item-category">
                      Category : <strong> {data.category}</strong>
                    </p>
                    <p className="item-price">
                      First Price : <strong>{data.firstPrice} $</strong>
                    </p>

                    {isAdmin && (
                      <>
                        <h5 className="admin-info">Admin Info:</h5>
                        <p className="item-bid">
                          Last Bid : <strong> {data.bid} $</strong>
                        </p>
                        <p className="item-start-date">
                          Start Date :{" "}
                          <strong>
                            {data.createdAt && data.createdAt.split("T")[0]}{" "}
                          </strong>
                        </p>
                        <p className="item-bid">Last Bidder : <strong> {data.bidder} </strong></p> 

                        <br />
                      </>
                    )}
                    <br />
                    <Bid
                      username={username}
                      setUsername={setUsername}
                      id={data._id}
                      item={item}
                      setItem={setItem}
                      items={items}
                      counter={counter}
                      setCounter={setCounter}
                      GetItems={GetItems}
                      endSale={endSale}
                      setEndSale={setEndSale}
                    />
                  </div>
                );
              }
              return (
                <div className="item" key={index}>
                  <img
                    className="item-img"
                    src={data.image}
                    alt=""
                  />
                  <h1 className="item-title">{data.title}</h1>
                  <h5 className="item-desc">{data.description}</h5>
                  <p className="item-category">
                    Category :<strong> {data.category}</strong>
                  </p>
                  <p className="item-price">
                    First Price : <strong>{data.firstPrice} $</strong>
                  </p>

                  <p className="item-end-auction">
                    End Of Auction : <strong>{data.endAuction} </strong>
                  </p>
                  <p className="item-bid">
                    Last Bid : <strong> {data.bid} $</strong>
                  </p>
                  {isAdmin && (
                    <>
                      <h5 className="admin-info">Admin Info:</h5>
                      <p className="item-start-date">
                        Start Date :{" "}
                        <strong>
                          {data.createdAt && data.createdAt.split("T")[0]}{" "}
                        </strong>
                      </p>
                      {/* <p className="item-bid">Last Bidder : <strong> {data.bidder} </strong></p>  */}
                    </>
                  )}
                  <br />
                  <Bid
                    username={username}
                    setUsername={setUsername}
                    id={data._id}
                    item={item}
                    setItem={setItem}
                    items={items}
                    counter={counter}
                    setCounter={setCounter}
                    GetItems={GetItems}
                    endSale={endSale}
                  />
                </div>
              );
            }):
            <div className="load">
            
            <div className="skel">

            <Skeleton variant="circular" width={40} height={40} />
            <br />
            <Skeleton variant="rectangular" width={210} height={60} />
            <br />
            <Skeleton variant="rounded" width={210} height={60} />
            <br />
            </div>
            <div className="skel">

            <Skeleton variant="circular" width={40} height={40} />
            <br />
            <Skeleton variant="rectangular" width={210} height={60} />
            <br />
            <Skeleton variant="rounded" width={210} height={60} />
            <br />
            </div>
            <div className="skel">

            <Skeleton variant="circular" width={40} height={40} />
            <br />
            <Skeleton variant="rectangular" width={210} height={60} />
            <br />
            <Skeleton variant="rounded" width={210} height={60} />
            <br />
            </div>
            <div className="skel">

            <Skeleton variant="circular" width={40} height={40} />
            <br />
            <Skeleton variant="rectangular" width={210} height={60} />
            <br />
            <Skeleton variant="rounded" width={210} height={60} />
            <br />
            </div>
            </div>
            }
      </div>
    </div>
  );
};

export default Items;
