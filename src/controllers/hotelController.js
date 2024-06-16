import httpStatus from "http-status";
import Hotel from "../models/hotelSchema";

const hotel = async (req, res) => {
  const id = req.params.id;

  try {
    const hotelExist = await Hotel.findOne({ _id: id });
    if (!hotelExist)
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: "Hotel does not exist" });

    return res
      .status(httpStatus.FOUND)
      .json({ message: "Hotel has been found", hotelExist });
  } catch (error) {
    logger.error(`Error displaying hotel: ${error}`);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong!" });
  }
};

const hotels = async (req, res) => {
  try {
    const Hotels = await Hotel.find();

    return res.status(httpStatus.OK).json({ message: "Hotels found", Hotels })
  } catch (error) {
    logger.error(`Error fetching hotels: ${error}`)
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Something went wrong!" })
  }
};

export { hotel, hotels };
