const Listing = require("../models/listing");
const geocoder = require("../utils/geocoding");


module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
        .populate("owner")
        .populate({
            path: "reviews",
            populate: { path: "author" }
        });
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
    try {
        const geoData = await geocoder.forwardGeocode({
            query: req.body.listing.location,
            limit: 1
        }).send();
        
        let geometry = geoData.body.features && geoData.body.features.length > 0 
            ? geoData.body.features[0].geometry 
            : { type: 'Point', coordinates: [77.5946, 12.9716] };
        
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.geometry = geometry;
        
        if (req.file) {
            newListing.image = {
                url: req.file.path,
                filename: req.file.filename
            };
        }
        
        await newListing.save();
        req.flash("success", "New Listing Created!");
        res.redirect("/listings");
    } catch (error) {
        console.error('Error creating listing:', error);
        req.flash("error", "Error creating listing");
        res.redirect("/listings/new");
    }
};

module.exports.editListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    
    try {
        const geoData = await geocoder.forwardGeocode({
            query: req.body.listing.location,
            limit: 1
        }).send();
        
        let geometry = geoData.body.features && geoData.body.features.length > 0 
            ? geoData.body.features[0].geometry 
            : { type: 'Point', coordinates: [77.5946, 12.9716] };
        
        const listing = await Listing.findByIdAndUpdate(id, { 
            ...req.body.listing,
            geometry
        }, { new: true });
        
        if (req.file) {
            listing.image = {
                url: req.file.path,
                filename: req.file.filename
            };
            await listing.save();
        }
        
        req.flash("success", "Listing updated successfully");
        res.redirect(`/listings/${id}`);
    } catch (error) {
        console.error('Error updating listing:', error);
        req.flash("error", "Error updating listing");
        res.redirect(`/listings/${id}/edit`);
    }
};

module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};

module.exports.searchListings = async (req, res) => {
    try {
        const { search } = req.query;
        
        if (!search || search.trim() === '') {
            return res.redirect('/listings');
        }
        
        // Search by title, location, or country (case-insensitive)
        const allListings = await Listing.find({
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } },
                { country: { $regex: search, $options: 'i' } }
            ]
        });
        
        res.render("listings/index.ejs", { allListings });
    } catch (error) {
        console.error('Search error:', error);
        req.flash("error", "Error searching listings");
        res.redirect("/listings");
    }
};

