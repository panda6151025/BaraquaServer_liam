const BasicBoat = require("../models/basicboat");
const Boat = require("../models/boat");
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();
// -----------------BOATBASIC---------------------//
exports.getallboattype = async (req, res) => {
  try {
    const basicset = await BasicBoat.findOne({});
    res.json({
      flag: true,
      data: basicset ? basicset.types : [], // Handles case if no document found
    });
  } catch (error) {
    res.json({
      flag: false,
      sort: "boattype",
      error: "Could not get all types",
    });
  }
};
exports.addboattype = async (req, res) => {
  try {
    const boatType = req.body.name;
    let basicset = await BasicBoat.findOne({});
    if (basicset) {
      if (!basicset.types.some((type) => type.name === boatType)) {
        basicset.types.push({
          _id: basicset.types.length + 1,
          name: boatType,
        });

        await basicset.save();
      }

      return res.json({ flag: true, data: basicset.types });
    } else {
      basicset = new BasicBoat();
      basicset.types.push({ _id: 1, name: boatType });

      await basicset.save();
      return res.json({ flag: true, data: basicset.types });
    }
  } catch (error) {
    return res.json({
      flag: false,
      sort: "general",
      error: "Could not add boat type",
    });
  }
};

exports.getallboatbrand = async (req, res) => {
  try {
    const basicset = await BasicBoat.findOne({});
    res.json({
      flag: true,
      data: basicset ? basicset.brands : [], // Corrected to brands
    });
  } catch (error) {
    res.json({
      flag: false,
      sort: "boatbrand",
      error: "Could not get all brands",
    });
  }
};
exports.addboatbrand = async (req, res) => {
  try {
    const boatBrand = req.body.name;
    let basicset = await BasicBoat.findOne({});
    if (basicset) {
      if (!basicset.brands.some((type) => type.name === boatBrand)) {
        basicset.brands.push({
          _id: basicset.brands.length + 1,
          name: boatBrand,
        });

        await basicset.save();
      }

      return res.json({ flag: true, data: basicset.brands });
    } else {
      basicset = new BasicBoat();
      basicset.brands.push({ _id: 1, name: boatBrand });

      await basicset.save();
      return res.json({ flag: true, data: basicset.brands });
    }
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not add boat brand",
    });
  }
};

exports.getallboatpower = async (req, res) => {
  try {
    const basicset = await BasicBoat.findOne({});
    res.json({
      flag: true,
      data: basicset ? basicset.powers : [], // Corrected to brands
    });
  } catch (error) {
    res.json({
      flag: false,
      sort: "powers",
      error: "Could not get all powers",
    });
  }
};
exports.addboatpower = async (req, res) => {
  try {
    const boatPower = req.body.name;
    let basicset = await BasicBoat.findOne({});
    if (basicset) {
      if (!basicset.powers.some((type) => type.name === boatPower)) {
        basicset.powers.push({
          _id: basicset.powers.length + 1,
          name: boatPower,
        });

        await basicset.save();
      }

      return res.json({ flag: true, data: basicset.powers });
    } else {
      basicset = new BasicBoat();
      basicset.powers.push({ _id: 1, name: boatPower });

      await basicset.save();
      return res.json({ flag: true, data: basicset.powers });
    }
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not add boat power",
    });
  }
};

exports.setEnginesCount = async (req, res) => {
  try {
    let basicset = await BasicBoat.findOne({});
    if (basicset) {
      basicset.enginecount = req.body.count;
      await basicset.save();
      res.json({ flag: true, enginecount: basicset.enginecount });
    } else {
      basicset = new BasicBoat();
      basicset.enginecount = req.body.count;
      await basicset.save();
      res.json({ flag: true, enginecount: basicset.enginecount });
    }
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not set engines count",
    });
  }
};
exports.getEnginesCount = async (req, res) => {
  try {
    const basicset = await BasicBoat.findOne({});
    let resultArray = Array.from({ length: basicset.enginecount }, (_, i) => ({
      _id: i + 1,
      name: i + 1 + "",
    }));

    if (basicset) {
      res.json({
        flag: true,
        data: resultArray,
      });
    } else {
      res.json({
        flag: false,
        sort: "enginecount",
        error: "Boat configuration not found.",
      });
    }
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not get engine count",
    });
  }
};

exports.setBathroomCount = async (req, res) => {
  try {
    let basicset = await BasicBoat.findOne({});
    if (basicset) {
      basicset.bathroomcount = req.body.count;
      await basicset.save();
      res.json({ flag: true, data: basicset.bathroomcount });
    } else {
      basicset = new BasicBoat();
      basicset.bathroomcount = req.body.count;
      await basicset.save();
      res.json({ flag: true, data: basicset.enginecount });
    }
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not set bathroom count",
    });
  }
};
exports.getBathroomCount = async (req, res) => {
  try {
    const basicset = await BasicBoat.findOne({});
    let resultArray = Array.from(
      { length: basicset.bathroomcount },
      (_, i) => ({
        _id: i + 1,
        name: i + 1 + "",
      })
    );

    if (basicset) {
      res.json({
        flag: true,
        data: resultArray,
      });
    } else {
      res.json({
        flag: false,
        sort: "bathroomcount",
        error: "Boat configuration not found.",
      });
    }
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not get bathroom count",
    });
  }
};

exports.setCapacity = async (req, res) => {
  try {
    let basicset = await BasicBoat.findOne({});
    if (basicset) {
      basicset.capacity = req.body.count;
      await basicset.save();
      res.json({ flag: true, data: basicset.capacity });
    } else {
      basicset = new BasicBoat();
      basicset.capacity = req.body.count;
      await basicset.save();
      res.json({ flag: true, data: basicset.capacity });
    }
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not set capacity",
    });
  }
};
exports.getCapacity = async (req, res) => {
  try {
    const basicset = await BasicBoat.findOne({});
    let resultArray = Array.from({ length: basicset.capacity }, (_, i) => ({
      _id: i + 1,
      name: i + 1 + "",
    }));

    if (basicset) {
      res.json({
        flag: true,
        data: resultArray,
      });
    } else {
      res.json({
        flag: false,
        sort: "capacity",
        error: "Boat configuration not found.",
      });
    }
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not get Capacity",
    });
  }
};

exports.setCabinscount = async (req, res) => {
  try {
    let basicset = await BasicBoat.findOne({});
    if (basicset) {
      basicset.cabinscount = req.body.count;
      await basicset.save();
      res.json({ flag: true, data: basicset.cabinscount });
    } else {
      basicset = new BasicBoat();
      basicset.cabinscount = req.body.count;
      await basicset.save();
      res.json({ flag: true, data: basicset.cabinscount });
    }
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not set Cabins count",
    });
  }
};
exports.getCabinscount = async (req, res) => {
  try {
    const basicset = await BasicBoat.findOne({});
    let resultArray = Array.from({ length: basicset.cabinscount }, (_, i) => ({
      _id: i + 1,
      name: i + 1 + "",
    }));

    if (basicset) {
      res.json({
        flag: true,
        data: resultArray,
      });
    } else {
      res.json({
        flag: false,
        sort: "cabinscount",
        error: "Boat configuration not found.",
      });
    }
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not get Cabins count",
    });
  }
};

exports.setLocationType = async (req, res) => {
  try {
    const locationtype = req.body.name;
    let basicset = await BasicBoat.findOne({});
    if (basicset) {
      if (!basicset.locationtype.some((type) => type.name === locationtype)) {
        basicset.locationtype.push({
          _id: basicset.locationtype.length + 1,
          name: locationtype,
        });

        await basicset.save();
      }

      return res.json({ flag: true, data: basicset.locationtype });
    } else {
      basicset = new BasicBoat();
      basicset.locationtype.push({ _id: 1, name: locationtype });

      await basicset.save();
      return res.json({ flag: true, data: basicset.locationtype });
    }
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not add boat power",
    });
  }
};
exports.getalllocationtype = async (req, res) => {
  try {
    const basicset = await BasicBoat.findOne({});
    res.json({
      flag: true,
      data: basicset ? basicset.locationtype : [],
    });
  } catch (error) {
    res.json({
      flag: false,
      sort: "locationtype",
      error: "Could not get all locationtype",
    });
  }
};

exports.setCancellation = async (req, res) => {
  const { name, description } = req.body;
  try {
    let basicset = await BasicBoat.findOne({});
    if (basicset) {
      basicset.cancellation.push({
        _id: basicset.cancellation.length + 1,
        name,
        description,
      });

      await basicset.save();

      return res.json({ flag: true, data: basicset.cancellation });
    } else {
      basicset = new BasicBoat();
      basicset.cancellation.push({ _id: 1, name, description });

      await basicset.save();
      return res.json({ flag: true, data: basicset.cancellation });
    }
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "Could not add boat cancellation",
    });
  }
};
exports.getCancellation = async (req, res) => {
  try {
    const basicset = await BasicBoat.findOne({});
    res.json({
      flag: true,
      data: basicset ? basicset.cancellation : [], // Corrected to brands
    });
  } catch (error) {
    res.json({
      flag: false,
      sort: "powers",
      error: "Could not get all cancellation",
    });
  }
};

exports.setAccessories = async (req, res) => {
  const title = req.params.title;
  const files = req.files["photo"];
  if (!files || files.length === 0) {
    return res
      .status(400)
      .json({ errors: { general: "No files were uploaded." } });
  }
  try {
    for (const file of files) {
      const params = {
        Bucket: process.env.S3_BUCKET,
        Key: `basicdata/Accessories/${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };
      const uploadResult = await s3.upload(params).promise();

      let basicset = await BasicBoat.findOne({});
      if (basicset) {
        basicset.accessories.push({
          _id: basicset.accessories.length + 1,
          icon: uploadResult.Location,
          title: title,
        });
        await basicset.save();
        return res.json({ flag: true, data: basicset.accessories });
      } else {
        basicset = new BasicBoat();
        basicset.accessories.push({
          _id: 1,
          icon: uploadResult.Location,
          title: title,
        });
        await basicset.save();
        return res.json({ flag: true, data: basicset.accessories });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errors: { general: "There was an error uploading the images." },
    });
  }
};
exports.getAccessories = async (req, res) => {
  try {
    const basicset = await BasicBoat.findOne({});
    res.json({
      flag: true,
      data: basicset ? basicset.accessories : [], // Corrected to brands
    });
  } catch (error) {
    res.json({
      flag: false,
      sort: "powers",
      error: "Could not get all accessories",
    });
  }
};

exports.setAllowes = async (req, res) => {
  const title = req.params.title;
  const files = req.files["photo"];
  if (!files || files.length === 0) {
    return res
      .status(400)
      .json({ errors: { general: "No files were uploaded." } });
  }
  try {
    for (const file of files) {
      const params = {
        Bucket: process.env.S3_BUCKET,
        Key: `basicdata/Allowes/${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };
      const uploadResult = await s3.upload(params).promise();

      let basicset = await BasicBoat.findOne({});
      if (basicset) {
        basicset.allowes.push({
          _id: basicset.allowes.length + 1,
          icon: uploadResult.Location,
          title: title,
        });
        await basicset.save();
        return res.json({ flag: true, data: basicset.allowes });
      } else {
        basicset = new BasicBoat();
        basicset.allowes.push({
          _id: 1,
          icon: uploadResult.Location,
          title: title,
        });
        await basicset.save();
        return res.json({ flag: true, data: basicset.allowes });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errors: { general: "There was an error uploading the images." },
    });
  }
};
exports.getAllowes = async (req, res) => {
  try {
    const basicset = await BasicBoat.findOne({});
    res.json({
      flag: true,
      data: basicset ? basicset.allowes : [], // Corrected to brands
    });
  } catch (error) {
    res.json({
      flag: false,
      sort: "powers",
      error: "Could not get all allowes",
    });
  }
};

// -----------------ADDBOAT---------------------//
exports.addBoat = async (req, res) => {
  try {
    const newboat = new Boat(req.body);
    await newboat.save();
    res.json({ flag: true, data: newboat });
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "There is unknown error, Please try again.",
    });
  }
};
exports.getboatbasicInfo = async (req, res) => {
  try {
    const boat = await Boat.findOne({ _id: req.params.id });
    if (boat) {
      res.json({
        flag: true,
        data: boat,
      });
    } else {
      res.json({
        flag: false,
        sort: "general",
        error: "Boat's basic information not found",
      });
    }
  } catch (error) {
    res.json({
      flag: false,
      sort: "general",
      error: "There is an unknown error, please try again.",
    });
  }
};

exports.addPlan = async (req, res) => {
  const { _id, price, description, start, end, captain } = req.body;
  try {
    const boat = await Boat.findOne({ _id: req.params.id });

    const existingPlanIndex = boat.plans.findIndex(
      (plan) => plan._id.toString() === _id
    );

    if (existingPlanIndex !== -1) {
      boat.plans[existingPlanIndex] = {
        _id,
        price,
        description,
        start,
        end,
        captain,
      };
    } else {
      const newPlanId = boat.plans.length + 1; // A simple way to generate a new ID
      boat.plans.push({
        _id: newPlanId,
        price,
        description,
        start,
        end,
        captain,
      });
    }

    await boat.save();
    res.json({ flag: true, data: boat });
  } catch (error) {
    res.json({
      flag: false,
      general: "general",
      error: "There is unknown error,Pleae try again",
    });
  }
};
exports.delPlan = async (req, res) => {
  const { _id } = req.body;
  try {
    const boat = await Boat.findOne({ _id: req.params.id });
    boat.plans = boat.plans.filter((plan) => plan._id !== _id);
    await boat.save();
    res.json({ flag: true, data: boat });
  } catch (error) {
    res.json({
      flag: false,
      general: "general",
      error: "There is unknown error,Pleae try again",
    });
  }
};

exports.addLocation = async (req, res) => {
  try {
    const boat = await Boat.findOne({ _id: req.params.id });
    boat.location2 = req.body;
    await boat.save();
    res.json({ flag: true, data: boat });
  } catch (error) {
    res.json({
      flag: false,
      general: "general",
      error: "There is unknown error, Please try again",
    });
  }
};

exports.addDocImage = async (req, res) => {
  const boatId = req.params.id;
  const imagetype = req.params.type;
  const files = req.files["photo"];

  if (!files || files.length === 0) {
    return res
      .status(400)
      .json({ errors: { general: "No files were uploaded." } });
  }

  try {
    const boat = await Boat.findOne({ _id: boatId });
    for (const file of files) {
      const params = {
        Bucket: process.env.S3_BUCKET,
        Key: `boats/${boatId}/${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };
      const uploadResult = await s3.upload(params).promise();
      if (["navigation", "authorization"].includes(imagetype)) {
        boat.docImage[imagetype] = uploadResult.Location;
      }
      await boat.save();
    }
    res.json({ flag: true, data: boat });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errors: { general: "There was an error uploading the images." },
    });
  }
};

exports.addBoatImage = async (req, res) => {
  const boatId = req.params.id;
  const imagetype = req.params.type;
  const files = req.files["photo"];
  if (!files || files.length === 0) {
    return res
      .status(400)
      .json({ errors: { general: "No files were uploaded." } });
  }
  try {
    const boat = await Boat.findOne({ _id: boatId });
    for (const file of files) {
      const params = {
        Bucket: process.env.S3_BUCKET,
        Key: `boats/${boatId}/${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };
      const uploadResult = await s3.upload(params).promise();
      if (
        ["cover", "photo2", "photo3", "photo4", "photo5"].includes(imagetype)
      ) {
        boat.boatImage[imagetype] = uploadResult.Location;
      }
      await boat.save();
    }
    res.json({ flag: true, data: boat });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errors: { general: "There was an error uploading the images." },
    });
  }
};

exports.addCancellation = async (req, res) => {
  try {
    const { cancellation } = req.body;
    const boat = await Boat.findOne({ _id: req.params.id });
    boat.cancellation = cancellation;
    await boat.save();
    res.json({ flag: true, data: boat });
  } catch (error) {
    res.json({
      flag: false,
      general: "general",
      error: "There is unknown error, Please try again",
    });
  }
};

exports.addAccessories = async (req, res) => {
  try {
    const { accessories } = req.body;
    const boat = await Boat.findOne({ _id: req.params.id });
    boat.accessories = accessories;
    await boat.save();
    res.json({ flag: true, data: boat });
  } catch (error) {
    res.json({
      flag: false,
      general: "general",
      error: "There is unknown error, Please try again",
    });
  }
};

exports.addAllowes = async (req, res) => {
  try {
    const { allowes } = req.body;
    const boat = await Boat.findOne({ _id: req.params.id });
    boat.allowes = allowes;
    await boat.save();
    res.json({ flag: true, data: boat });
  } catch (error) {
    res.json({
      flag: false,
      general: "general",
      error: "There is unknown error, Please try again",
    });
  }
};
//-------------------MyBoatSetting--------------------//

exports.getMyboat = async (req, res) => {
  try {
    const boats = await Boat.find({ user: req.params.userid }).select(
      "location.boatname boattype location.address flag"
    );

    res.json({
      flag: true,
      data: boats,
    });
  } catch (error) {
    console.error("Error fetching boats:", error);
    res.status(500).json({
      flag: false,
      general: "general",
      error: "There is an unknown error, please try again.",
    });
  }
};

exports.setBoatFlag = async (req, res) => {
  try {
    const { flag } = req.body;
    const boat = await Boat.findOne({ _id: req.params.id });
    boat.flag = flag;
    await boat.save();
    res.json({ flag: true, data: boat });
  } catch (error) {
    console.error("Error fetching boats:", error);
    res.status(500).json({
      flag: false,
      general: "general",
      error: "There is an unknown error, please try again.",
    });
  }
};

//-----------------------GETALLBOAT---------------------//
exports.getAllboats = async (req, res) => {
  try {
    const boats = await Boat.find({})
      .select("model size capacity year review location1 boatImage.cover plans")
      .lean();

    const result = boats.map((boat) => ({
      _id: boat._id,
      model: boat.model,
      size: boat.size,
      capacity: boat.capacity,
      year: boat.year,
      review: boat.review || 0,
      location1: boat.location1,
      coverImage: boat.boatImage?.cover || "",
      price: boat.plans?.[0]?.price || null,
    }));
    res.json({
      flag: true,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching boats:", error);
    res.status(500).json({
      flag: false,
      general: "general",
      error: "There is an unknown error, please try again.",
    });
  }
};
