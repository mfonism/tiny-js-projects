class Storage {
    setLocation(location) {
        localStorage.setItem('location', location);
    }

    getLocation() {
        return localStorage.getItem('location');
    }
}