import React from "react";
import {describe, expect, test} from '@jest/globals';
import { render, fireEvent, waitFor } from "@testing-library/react";
import Product, { IProps } from "../components/Product";
import "@testing-library/jest-dom/extend-expect";

/**
 * @jest-environment jsdom
 * @brief This test is to check if the product component is rendered correctly, and functions as expected.
 * @returns Test Product Component
 */
const setup = () => {
    const props: IProps = {
        item: {
            Id: 1,
            Name: "Test",
            Category: 2,
            Price: 1,
        },
        handleCheck: jest.fn(),
        showModal: jest.fn(),
    };
    const { getByTestId } = render(<table><tbody><Product {...props} /></tbody></table>);
    return { props, getByTestId };
}

/**
 * @brief Basic test to check if the component is working as intended.
 */
describe("Test creation of product in table:", () => {
    test("Should contain values of item passed in", async () => {
        const { getByTestId } = setup()
        expect(getByTestId("product-Name").innerHTML).toBe("Test");
        expect(getByTestId("product-Category").innerHTML).toBe("2");
        expect(getByTestId("product-Price").innerHTML).toBe("1");
    });

    test("Checkbox should be unchecked by default", async () => {
        const { getByTestId } = setup()
        expect(getByTestId("product-checkbox")).toHaveProperty("checked", false);
    });

    test("Checkbox should be checked when clicked", async () => {
        const { getByTestId } = setup()
        fireEvent.click(getByTestId("product-checkbox"));
        expect(getByTestId("product-checkbox")).toHaveProperty("checked", true);
    });

    test("Should call handleCheck when checkbox is clicked", async () => {
        const { getByTestId, props } = setup()
        fireEvent.click(getByTestId("product-checkbox"));
        expect(props.handleCheck).toHaveBeenCalled();
    });
});