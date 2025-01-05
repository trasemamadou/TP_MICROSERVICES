package com.wafflecorp.store.customer;

import org.springframework.data.domain.Limit;
import org.springframework.data.domain.ScrollPosition;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Window;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.graphql.data.query.ScrollSubrange;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class CustomerController {

    private final CustomerRepository repository;

    public CustomerController(CustomerRepository repository ) {
        this.repository = repository;
    }

    @QueryMapping
    public List<Customer> allCustomers() {
        return repository.findAll();
    }

    @QueryMapping
    public Customer findCustomerByLastName(@Argument String last) {
        return repository.findByLastName(last);
    }





}
