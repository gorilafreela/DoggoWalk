import { Redirect } from "expo-router";
import StorageService from "../services/StorageService";
export default function Index() {
    return <Redirect href="/home" />;
}