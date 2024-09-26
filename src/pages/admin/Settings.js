import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setAllSettings, setSetting } from '../../redux/admin/settingsSlice';

const Settings = () => {
    const dispatch = useDispatch();
    const { data: settings } = useSelector((state) => state.settings);
    const [localSettings, setLocalSettings] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axios.get('/api/admin/settings'); // Adjust the API endpoint as necessary
                dispatch(setAllSettings(response.data));
                setLocalSettings(response.data);
            } catch (error) {
                console.error('Failed to fetch settings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setLocalSettings((prevSettings) => ({
            ...prevSettings,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('/api/admin/settings', localSettings); // Adjust the API endpoint as necessary
            // Update local state for each setting
            Object.keys(localSettings).forEach((key) => {
                dispatch(setSetting({ key, value: localSettings[key] }));
            });
        } catch (error) {
            console.error('Failed to update settings:', error);
        }
    };

    if (loading) {
        return <div>Loading settings...</div>;
    }

    return (
        <div className="settings-page">
            <h1>Settings</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="siteName">Site Name</label>
                    <input
                        type="text"
                        id="siteName"
                        name="site_name"
                        className="form-control"
                        value={localSettings.site_name || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="adminEmail">Admin Email</label>
                    <input
                        type="email"
                        id="adminEmail"
                        name="admin_email"
                        className="form-control"
                        value={localSettings.admin_email || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="maintenanceMode">Maintenance Mode</label>
                    <input
                        type="checkbox"
                        id="maintenanceMode"
                        name="maintenance_mode"
                        checked={localSettings.maintenance_mode || false}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Save Settings</button>
            </form>
        </div>
    );
};

export default Settings;
